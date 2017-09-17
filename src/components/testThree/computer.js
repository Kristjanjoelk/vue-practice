/* eslint-disable */
// console.log('hello world! outside')
export default function computer(option)  {
    var self = this
    self.option = option
    // console.log('current option:', option)
    
    function initSeenList() {
        let temp = []
        for(let i = 0; i < self.option.width; i++){
            let innerTemp = []
            for(let j = 0; j < self.option.width; j++){
                innerTemp.push(0)
            }
            temp.push(innerTemp)
        }
        console.log('seenlist', temp)
        return temp
    }
    // dir = direciton duh..
    // 0 = down   2 = left
    // 1 = up     3 = right
    // 4 = south-east = up-right
    // 5 = north-east = down-right
    // 6 = south-west - up-left
    // 7 = north-west = down-left
    function getOptimalDirectionList(playerLoc, enemyLoc) {
        console.log(playerLoc, enemyLoc)
        let d = 0
        for(let i = 0; i < 8; i++){
            d = checkForPlayer(i, playerLoc, enemyLoc)
            if(d !== -1) {
                return [d, d, d, d, d, d, d, d]
            }
        }

        if(enemyLoc.x === playerLoc.x) {
            if(enemyLoc.y > playerLoc.y) {
                return [0, 7, 5, 2, 3, 6, 1, 4]
            } else {
                return [1, 6, 4, 2, 3, 7, 0, 5]
            }
        }
        if(enemyLoc.y === playerLoc.y) {
            if(enemyLoc.x > playerLoc.x) {
                return [2, 7, 6, 0, 1, 5, 3, 4]
            } else {
                return [3, 5, 4, 0, 1, 7, 6, 2]
            }
        }
        if(enemyLoc.x > playerLoc.x) {
            if(enemyLoc.y > playerLoc.y) {
                return [7, 0, 2, 5, 6, 1, 3, 4] // 4, 0, 3, 5, 6, 2, 7, 1
            }
            return [6, 1, 2, 4, 7, 3, 0, 5] // 6, 0, 2, 4, 7, 3, 1, 5
        }
        if(enemyLoc.x < playerLoc.x) {
            if(enemyLoc.y > playerLoc.y) {
                return [5, 3, 0, 7, 4, 1, 2, 6]
            }
            return [4, 3, 1, 5, 6, 2, 0, 7] // 6, 0, 2, 4, 7, 3, 1, 5
        }
    }

    function sliceArray(arr) {
        let newArray = []
        for(let i = 0; i < arr.length; i++) {
            newArray.push(arr[i].slice())
        }
        return newArray
    }

    function checkForPlayer(dir, playerLoc, enemyLoc) {
        let upDown = 0
        let leftRight = 0
        if(dir < 2) {
            upDown = dir === 0 ? upDown + 1 : upDown - 1
        } else if(dir < 4 && dir >= 2) {
            leftRight = dir === 2 ? leftRight - 1 : leftRight + 1
        } else if(dir < 6) {
            leftRight = 1
            upDown = dir === 5 ? upDown - 1 : upDown + 1
        } else if(dir >= 6) {
            leftRight = -1
            upDown = dir === 7 ? upDown - 1 : upDown + 1
        }
        let currLoc = {
            x: playerLoc.x + leftRight,
            y: playerLoc.y + upDown
        }
        if(foundPlayer(currLoc, enemyLoc)) {
            return dir;
        } else {
            return -1
        }
    }

    self.initFindPlayer = function(playerLoc, board, enemyLoc, draw) {
        var seen = initSeenList()
        // console.log('seenlist', seen)
        console.log('from initFindPlayer')
        console.log(playerLoc, enemyLoc)
        let possibleSolutions = []
        let temp = []
        let prevSolLength = 10000
        let dirList = getOptimalDirectionList(playerLoc, enemyLoc)
        console.log('initial dirList', dirList, 'from:', playerLoc, enemyLoc)
        // return draw(dirList[0])
        for(let i = 0; i < 8; i++){
            let dir = dirList[i]
            let res = findPlayer(dir, playerLoc, board, enemyLoc, seen)
            if(typeof res === 'object' && res.found) {
                temp = []
                temp.push(playerLoc)
                temp.push(res)
                return temp
            }
            if(res && containsSolution(res)) {
                if(prevSolLength === 0) {
                    prevSolLength = res.length
                }
                if(res.length <= prevSolLength) {
                    prevSolLength = res.length
                    possibleSolutions.push(res)
                }
            }
        }
        // No possible routes
        if(!possibleSolutions.length) {
            console.log('no possibleSolutions!')
            let possibleDir = getPossibleDirection(getOptimalDirectionList(playerLoc, enemyLoc), enemyLoc, board)
            draw(possibleDir)
        } else {
            console.log('alot of possible solutions', possibleSolutions.length)
            draw(possibleSolutions[possibleSolutions.length - 1])
        }
        // for(let i = 0; i < possibleSolutions.length; i++) {
        //     draw(possibleSolutions[i])
        // }
    }

    function getPossibleDirection(list, enemyLoc, board) {
        for(let i = 0; i < list.length; i++) {
            let upDown = 0
            let leftRight = 0
            let dir = list[i]
            if(dir < 2) {
                upDown = dir === 0 ? upDown + 1 : upDown - 1
            } else if(dir < 4 && dir >= 2) {
                leftRight = dir === 2 ? leftRight - 1 : leftRight + 1
            } else if(dir < 6) {
                leftRight = 1
                upDown = dir === 5 ? upDown - 1 : upDown + 1
            } else if(dir >= 6) {
                leftRight = -1
                upDown = dir === 7 ? upDown - 1 : upDown + 1
            }
    
            let currLoc = {
                x: enemyLoc.x + leftRight,
                y: enemyLoc.y + upDown
            }
            if(!outOfBounds(currLoc) && pathAvailable(currLoc, board)) {
                console.log('possible dir:', dir)
                return dir
            }
        }
        console.log('no possible dirs found in', list)
    }
    // dir = direciton duh..
    // 0 = down   2 = left
    // 1 = up     3 = right
    // 4 = south-east
    // 5 = north-east
    // 6 = south-west
    // 7 = north-west
    // loc = the current location
    function findPlayer(dir, playerLoc, board, enemyLoc, seen) {
        // console.log('going ', dir, seen[1])
        // console.log('going ', dir, seen[2])
        // console.log('going ', dir, seen[3])
        let upDown = 0
        let leftRight = 0
        if(dir < 2) {
            upDown = dir === 0 ? upDown + 1 : upDown - 1
        } else if(dir < 4 && dir >= 2) {
            leftRight = dir === 2 ? leftRight - 1 : leftRight + 1
        } else if(dir < 6) {
            leftRight = 1
            upDown = dir === 5 ? upDown - 1 : upDown + 1
        } else if(dir >= 6) {
            leftRight = -1
            upDown = dir === 7 ? upDown - 1 : upDown + 1
        }

        let currLoc = {
            x: enemyLoc.x + leftRight,
            y: enemyLoc.y + upDown
        }
        // console.log('currLoc:', currLoc)
        if(outOfBounds(currLoc) || !board[currLoc.y][currLoc.x]) {
            return false
        } else if(!pathAvailable(currLoc, board)) {
            return false
        } else if(seen[currLoc.y][currLoc.x]) {
            return false
        } else if(foundPlayer(currLoc, playerLoc)){
            return {
                loc: currLoc,
                found: true
            }
        }
        var temp = []
        var newSeen = sliceArray(seen)
        newSeen[currLoc.y][currLoc.x] = 1
        // console.log(seen, newSeen)
        temp.push(currLoc)
        var dirList = getOptimalDirectionList(currLoc, enemyLoc)
        for(let i = 0; i < 8; i++){
            var currDir = dirList[i]
            var res = findPlayer(currDir, playerLoc, board, currLoc, newSeen)
            if(res) {
                // console.log(temp, res)
                return temp.concat(res)
            }
        }
        return false

    }

    function containsSolution(arr) {
        // console.log('checking sol:', arr)
        for(let i = 0; i < arr.length; i++) {
            let curr = arr[i]
            if(curr.found) {
                // console.log('found solution in', arr)
                return true
            }
        }
    }

    function outOfBounds(enemyLoc) {
        if(enemyLoc.x < 1 || enemyLoc.y < 1) {
            return true
        } else if(enemyLoc.x >= self.option.width || enemyLoc.y >= self.option.width) {
            return true
        }
        return false
    }

    function foundPlayer(currLoc, playerLoc) {
        return currLoc.x === playerLoc.x && currLoc.y === playerLoc.y
    }

    function pathAvailable(enemyLoc, board) {
        if(board[enemyLoc.y][enemyLoc.x] === '0' || board[enemyLoc.y][enemyLoc.x] === '2') {
            return false
        }
        return true
    }

    function seenBefore(enemyLoc, seen) {
        for(let i = 0; i < seen.length; i++) {
            if(seen[i].x === enemyLoc.x && seen[i].y === enemyLoc.y) {
                return true
            }
        }
        return false
    }
}
