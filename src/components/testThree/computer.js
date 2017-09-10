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
        // console.log('seenlist', temp)
        return temp
    }
    // dir = direciton duh..
    // 0 = down   2 = left
    // 1 = up     3 = right
    // 4 = south-east = up-right
    // 5 = north-east = down-right
    // 6 = south-west - up-left
    // 7 = north-west = down-left
    function getOptimalDirectionList(loc, playerLoc) {
        let d = 0
        for(let i = 0; i < 8; i++){
            d = checkForPlayer(i, loc, playerLoc)
            if(d !== -1) {
                return [d, d, d, d, d, d, d, d]
            }
        }

        if(playerLoc.x === loc.x) {
            if(playerLoc.y > loc.y) {
                return [1, 4, 6, 2, 3, 1, 4, 6]
            } else {
                return [0, 5, 7, 2, 3, 0, 5, 7]
            }
        }
        if(playerLoc.y === loc.y) {
            if(playerLoc.x > loc.x) {
                return [3, 4, 5, 0, 1, 1, 3, 4]
            } else {
                return [2, 6, 7, 0, 1, 2, 6, 7]
            }
        }
        if(playerLoc.x > loc.x) {
            if(playerLoc.y > loc.y) {
                return [1, 4, 3, 6, 0, 2, 5, 7]
            }
            return [3, 4, 5, 0, 1, 2, 6, 7]
        } else {
            if(playerLoc.y > loc.y) {
                return [2, 6, 4, 1, 0, 3, 7, 5]
            }
            return [2, 6, 7, 0, 1, 3, 4, 5]
        }
    }

    function sliceArray(arr) {
        let newArray = []
        for(let i = 0; i < arr.length; i++) {
            newArray.push(arr[i].slice())
        }
        return newArray
    }

    function checkForPlayer(dir, loc, playerLoc) {
        let upDown = 0
        let leftRight = 0
        if(dir < 2) {
            upDown = dir === 0 ? upDown - 1 : upDown + 1
        } else if(dir < 4) {
            leftRight = dir === 0 ? leftRight - 1 : leftRight + 1
        } else if(dir < 6) {
            leftRight = 1
            upDown = dir === 4 ? upDown - 1 : upDown + 1
        } else if(dir >= 6) {
            leftRight = -1
            upDown = dir === 7 ? upDown - 1 : upDown + 1
        }
        let currLoc = {
            x: loc.x + leftRight,
            y: loc.y + upDown
        }
        if(foundPlayer(currLoc, playerLoc)) {
            return dir;
        } else {
            return -1
        }
    }

    self.initFindPlayer = function(loc, board, playerLoc, draw) {
        var seen = initSeenList()
        // console.log('seenlist', seen)
        let possibleSolutions = []
        let temp = []
        let prevSolLength = 10000
        let dirList = getOptimalDirectionList(loc, playerLoc)
        for(let i = 0; i < 8; i++){
            let dir = dirList[i]
            let res = findPlayer(dir, loc, board, playerLoc, seen)
            if(typeof res === 'object' && res.found) {
                temp = []
                temp.push(loc)
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
        for(let i = 0; i < possibleSolutions.length; i++) {
            draw(possibleSolutions[i])
        }
    }
    // dir = direciton duh..
    // 0 = down   2 = left
    // 1 = up     3 = right
    // 4 = south-east
    // 5 = north-east
    // 6 = south-west
    // 7 = north-west
    // loc = the current location
    function findPlayer(dir, loc, board, playerLoc, seen) {
        console.log('going ', dir)
        let upDown = 0
        let leftRight = 0
        if(dir < 2) {
            upDown = dir === 0 ? upDown - 1 : upDown + 1
        } else if(dir < 4) {
            leftRight = dir === 0 ? leftRight - 1 : leftRight + 1
        } else if(dir < 6) {
            leftRight = 1
            upDown = dir === 4 ? upDown - 1 : upDown + 1
        } else if(dir >= 6) {
            leftRight = -1
            upDown = dir === 7 ? upDown - 1 : upDown + 1
        }

        let currLoc = {
            x: loc.x + leftRight,
            y: loc.y + upDown
        }
        // console.log('currLoc:', currLoc)
        if(outOfBounds(currLoc) || !board[currLoc.y][currLoc.x]) {
            return false
        } else if(!pathAvailable(loc, board)) {
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
        var dirList = getOptimalDirectionList(currLoc, playerLoc)
        for(let i = 0; i < 8; i++){
            var currDir = dirList[i]
            var res = findPlayer(currDir, currLoc, board, playerLoc, newSeen)
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

    function outOfBounds(loc) {
        if(loc.x < 0 || loc.y < 0) {
            return true
        } else if(loc.x >= self.option.width || loc.y >= self.option.width) {
            return true
        }
        return false
    }

    function foundPlayer(currLoc, playerLoc) {
        if(currLoc.x === playerLoc.x && currLoc.y === playerLoc.y) {
            return true
        }
        return false
    }

    function pathAvailable(loc, board) {
        if(board[loc.y][loc.x] === '0' || board[loc.y][loc.x] === '2') {
            return false
        }
        return true
    }

    function seenBefore(loc, seen) {
        for(let i = 0; i < seen.length; i++) {
            if(seen[i].x === loc.x && seen[i].y === loc.y) {
                return true
            }
        }
        return false
    }
}
