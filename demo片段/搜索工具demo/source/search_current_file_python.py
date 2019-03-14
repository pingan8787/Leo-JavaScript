import json
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt
import numpy as np

plt.rcParams['font.sans-serif']=['SimHei'] # 解决中文乱码

saveImgName = 'search_result.png'
file = open('./search_current_file_json.json','r', encoding='utf-8')
file = json.load(file)

keyName = []     # 需要显示的分类图表（按外层文件夹）
selectName = ''  # 用户选择的文件夹名称

def getKeyName(): 
  for name in file: 
    keyName.append(name)

def pctName(pct, allvals):  # 饼图数字数据格式转换
  absolute = int(round(pct/100.*np.sum(allvals)))
  # print(pct, allvals,absolute)
  return "{:d}个\n({:.1f}%)".format(absolute, pct)

def drawOneChart(name, label, data):
  plt_title = name
  plt.figure(figsize=(6,9)) # 调节图形大小
  labels = label   # 定义标签
  sizes  = data    # 每块值
  colors = ['antiquewhite','aquamarine','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','crimson','cyan','deeppink','deepskyblue','dimgray','dodgerblue','firebrick','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgreen','lightgray','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellow','yellowgreen'] #每块颜色定义
  explode = []    # 将某一块分割出来，值越大分割出的间隙越大
  max_data = max(sizes)
  for i in sizes: # 初始化每块之间间距，最大值分割出来
    if i == max_data:
      explode.append(0.2)
    else:
      explode.append(0)

  # 控制x轴和y轴的范围
  # plt.xlim(0,14)
  # plt.ylim(0,14)

  patches,text1,text2 = plt.pie(sizes,
                        explode = explode,
                        labels  = labels,
                        colors  = colors,
                        autopct = lambda pct: pctName(pct, data),  # 数值保留固定小数位 '%3.2f'指小数点前后位数(没有用空格补齐)
                        frame   = 1,             # 是否显示饼图的图框，这里设置显示
                        shadow  = True,          # 无阴影设置
                          labeldistance = 1.1,     # 图例距圆心半径倍距离
                        counterclock  = False,   # 是否让饼图按逆时针顺序呈现；
                        startangle    = 90,      # 逆时针起始角度设置
                        pctdistance   = 0.6      # 数值距圆心半径倍数距离
                        )       
  # patches饼图的返回值，texts1饼图外label的文本，texts2饼图内部的文本
  # x，y轴刻度设置一致，保证饼图为圆形

  # 删除x轴和y轴的刻度
  plt.xticks(())
  plt.yticks(())
  plt.axis('equal')
  plt.legend()
  plt.title(plt_title+'文件夹下文件分布（顺时针）', bbox={'facecolor':'0.8', 'pad':5})
  plt.savefig(plt_title+'_'+saveImgName) # 一定放在plt.show()之前
  plt.show()

def drawAllChart(openName):
  for name in keyName:
    labels = []
    values = []
    for view_name in file[name]:
      labels.append(view_name)
      values.append(len(file[name][view_name]))
      
    if openName == '' or openName == name:  
      drawOneChart(name, labels, values)
    else:
      print('输入有误')

def init():
  getKeyName()
  select = ','.join(keyName)
  # 用户通过输入要查看的文件夹名称，来展示对应文件夹的饼图，默认显示所有文件夹饼图
  selectName = input('检索到的文件夹有：【' + select + '】，请输入要查看的文件夹名称（默认所有）：')
  drawAllChart(selectName)

init()