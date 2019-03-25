import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { 
  AtNavBar, AtSearchBar, AtGrid, 
  AtTabs, AtTabsPane,
  AtList, AtListItem
} from 'taro-ui'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }


  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      current: 0,
      learnButton: [
        {title: "课程中心", icon: "", src: ""},
        {title: "考试任务", icon: "", src: ""},
        {title: "问答社区", icon: "", src: ""},
        {title: "知识库", icon: "", src: ""},
        {title: "培训班", icon: "", src: ""},
        {title: "学习地图", icon: "", src: ""},
        {title: "胜任力任务", icon: "", src: ""},
        {title: "管理", icon: "", src: ""},
        {title: "收起", icon: "", src: ""},
      ],
      learnTotalItem: [
        {title:'已完成计划', num:10, type:'个'},
        {title:'已通过课程', num:10, type:'个'},
        {title:'累计获得', num:10, type:'学分'},
      ],
      courseData: [
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
        {note:'课程标题', title:'简介内容简介内容简介内容简介内容简介内容简介内容'},
      ]
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const listItems = this.state.learnButton.map((item) =>
      <View className='at-col at-col-2'>{item.title}</View>
    );
    
    const tabList = [{ title: '课程列表' }, { title: '学习计划' }]
    const learnMenuList =           
    [
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '课程中心'
      },
      {
        image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        value: '考试任务'
      },
      {
        image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '问答社区'
      },
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        value: '知识库'
      },
      {
        image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        value: '培训班'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '学习地图'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '胜任力任务'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '管理'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '收起'
      }
    ]
    const learnTotal = this.state.learnTotalItem.map(item => 
      <View className='at-col at-col-4 learn-item'>
        <View>
          <Text className='num'>{item.num}</Text><Text>{item.type}</Text>
        </View>
        <View>
          <Text>{item.title}</Text>
        </View>
      </View>
    )
    const courseList = this.state.courseData.map(item =>
      <AtListItem
        note={item.note}
        title={item.title}
        thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
      />
    )
    return (
      <View className='learnIndex'>
        <AtNavBar
          // onClickRgIconSt={this.handleClick}
          // onClickRgIconNd={this.handleClick}
          // onClickLeftIcon={this.handleClick}
          color='#000'
          title='学习'
          fixed={true}
          // leftText='返回'
          // rightFirstIconType='bullet-list'
          // rightSecondIconType='user'
        />
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        {/* <View className='at-row at-row--wrap'>
          {listItems}
        </View> */}
        <AtGrid columnNum={5} hasBorder={false} className="learn-menu" data={learnMenuList} 
        />
        <View className='at-row learn-total'>
          {learnTotal}
        </View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View>
              <AtList>
                {courseList}
              </AtList>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>标签页二的内容</View>
          </AtTabsPane>
        </AtTabs>
        {/* <View className='at-icon at-icon-settings'></View> */}
        {/* <AtIcon prefixClass='exe' value='study-path' size='130' color='#000'></AtIcon> */}
      </View>
    )
  }
}

export default Index
