/**
 * 需要实现 polymerize 方法，来将被拍平的数组 input 还原成原始的 output
 * 
 *   // output 结果举例，数组顺序不做要求
  [
    [
      [1, 1],
      [2, 1]
    ],
    [
      [2, 4],
      [2, 5],
      [3, 4],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7]
    ],
    [
      [3, 2]
    ],
    [
      [5, 3],
      [6, 3],
      [6, 4],
      [6, 5]
    ]
  ]

 */

// input 数组内顺序不做保证
const input = [
    [1, 1],
    [2, 1],
    [2, 4],
    [2, 5],
    [3, 2],
    [3, 4],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [5, 3],
    [6, 3],
    [6, 4],
    [6, 5]
  ]
const output = polymerize(input)


const polymerize = input => {
    if(!input || !(input instanceof Array)) return [];
    let result = [], str = [];
    // 1. 将原始数组 input 的每一项转换为字符串，保存在 str 数组，方便判断某个数组是否已存在于原始数组。
    input.map(item => str.push(item.toString()));

    const isExist = item => str.includes(item.toString());
    const isFirst = i => {
        const left = [i[0]-1, i[1]];
        const top = [i[0], i[1] - 1];
        return !isExist(left) && !isExist(top)
    }

    // 2. 遍历输入的原始数组 input。
    for(let k = 0; k < input.length; k ++){
        const cItem = input[k];

        // 3. 如果当前项的顶部和左侧元素为空，则当前项是首项，只需要对首项处理即可。
        if(isFirst(cItem)){
            // 4. 定义一个 current 数组作为当前层的数组，并将首项作为该数组第一项。
            const current = [cItem];
            
            const getOtherItem = i => {
                // 5.1 计算某一项的右侧和底部元素
                const cArray = [ [i[0] + 1, i[1]], [i[0], i[1] + 1] ];
                // 5.2 遍历右侧和底部元素
                cArray.map(e => {
                    // 5.3 如果当前项存在于 str 数组，则表示该项已存在，推入 current 数组，并把当前项继续计算，直至结束
                    if(isExist(e)){
                        current.push(e);
                        getOtherItem(e);
                    }
                })
            }
            // 5. 获取当前项周围相邻的每一项
            getOtherItem(cItem);

            // 6. 将当前项推入结果 result 数组，完成调用
            result.push(current);
        }
    }

    return result;
}

const output = polymerize(input)

