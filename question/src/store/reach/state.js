export default {
  lessonCover: {}, // 课节信息
  lists: [], // 所有题的列表
  moduleData: [],
  moduleIndex: 0, // 当前答题模块索引
  moduleIndexCan: 0, // 当前可答题模块索引
  pageIndex: 0, // 在当前模块的页码索引
  gameName: '',
  saveData: [], // 数据保留
  localData: {}, // 数据保留
  prevPage: 0, // 前一页页码
  mode: '',
  game: '',
  moduleName: '',
  questionData: {}, // 当前题型需要的配置数据
  drag: null,
  groove: null,
  hasTip: false,
  dragType: '',
  grooveType: '',
  position: '0,0',
  collision: false, // 碰撞
  keyup: false,
  dragedList: {},
  dragBackList: [],
  drag1: null,
  groove1: null,
  position1: '0,0',
  collision1: false, // 碰撞
  keyup1: false,
  dragedList1: {},
  dragBackList1: [],
  preview: true, // 预习复习
  moduleScore: {}, // 各个模块分数
  modulePageIndex: {}, // 模块进行到的页数
  wordsScore: {}, // 各个评测结果，
  wordsTokenId: {}, // 各个单词评测录音
  choiceSubmit: false, // 选择题提交
  isSubmit: false, // ok按钮是否激活
  completed: false, // 完成所有答题
  moduleCompleted: false, // 完成当前模块
  moduleAverage: [], // 各个模块平均分

  // audio
  audio: '',
  duration: 0,
  playStatus: false, // 0: 非播放中 1：播放中
  stopChoiceAudio: false // 停止所有选择题音频播放
}
