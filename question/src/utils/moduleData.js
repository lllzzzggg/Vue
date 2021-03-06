export default {
  game: 'L_Pre_ReachA_50',
  mode: 'preview', // preview 和 review
  cover: {
    title: 'Rudy in her own time Rudy in her own time',
    imgUrl: '',
    introduceText: 'Rudy in her own time by Jonathan Emm-mentMother Duck and Father Duck live a hap-py house.the Father Duck live a hap Rudy in her own time by Jonathan Emm-mentMother',
    goalText: '1.Students are able to understand and a-pply the key words.Key words:1.Students are able to understand and a-pply the key words.Key words:1.Students are able to understand and a-pply the key words.Key words:   1.Students are able to understand and a-pply the key words.Key words:1.Students are able to understand and a-pply the key words.Key words:1.Students are able to understand and a-pply the key words.Key words:'
  },
  lists: [
    {
      moduleName: 'Read',
      type: 'Learn',
      questionList: [{
        type: 'Read',
        data: {
          words: [
            ['chess', 'football', 'slide', 'swim'],
            ['pumpkin']
          ],
          texts: [
            'What activity do you like?',
            'She likes to eat pumpkin pie.'
          ]
        }
      },
      {
        type: 'Read',
        data: {
          words: [
            ['can', 'help', 'plant', 'each other', 'sick']
          ],
          texts: [
            'Look at these three families. In the first family, the girl is helping her sick grandpa plant a flower.'
          ]
        }
      },
      {
        type: 'Read',
        data: {
          words: [
            ['all', 'daughter', 'these']
          ],
          texts: [
            'In the second one, the mother and her daughter are reading a book.'
          ]
        }
      }
      ]
    },
    {
      moduleName: 'Choice_Single',
      type: 'Words',
      questionList: [
        {
          type: 'ChoiceLook',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer. beyond',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'select A ' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            answer: 'A'
          }
        },
        {
          type: 'ChoiceReading',
          data: {
            audio: 'Question_P01.mp3',
            readAudio: 'Question_P01.mp3',
            readingText: {
              title: 'Title To people title title title title title title',
              content: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.'
            },
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer. beyond',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'select A ' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            answer: 'A'
          }
        },
        {
          type: 'ChoiceLongWords',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer.trace of ofsensitive data from your computer.',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'Bushwick meh permanent erasure digital trace beyon mehpermanent erasur meh permanent erasure digital tracebeyo erasure digital tracebeyo tracebeyo erasure digital tracebeyo' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            answer: 'A'
          }
        },
        {
          type: 'ChoiceImage',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards ',
            selectOptions: [
              {
                key: 'A',
                img: 'Choice_A.jpg'
              },
              {
                key: 'B',
                img: 'Choice_B.jpg'
              },
              {
                key: 'C',
                img: 'Choice_C.jpg'
              }
            ],
            answer: 'A'
          }
        },
        {
          type: 'ChoiceImgText',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer.',
            selectOptions: [
              {
                key: 'A',
                text: 'select A',
                img: 'Choice_A.jpg'
              },
              {
                key: 'B',
                text: 'select B select B select B select B select B select B select B',
                img: 'Choice_B.jpg'
              },
              {
                key: 'C',
                text: 'select C select C select C select C select C select C select C',
                img: 'Choice_C.jpg'
              }
            ],
            answer: 'A'
          }
        }
      ]
    },
    {
      moduleName: 'LearnWord',
      type: 'Reading',
      questionList: [
        {
          type: 'Speech',
          data: {
            audio: 'Question_P01.mp3',
            word: 'This is a example.',
            lookUrl: 'Question.jpg'
          }
        },
        {
          type: 'LearnWord',
          data: {
            audio: 'Question_P01.mp3',
            word: [
              'LearnWord', 'EX: this is a <span style="color: #2ad4f3">example</span>.'
            ],
            lookUrl: 'Question.jpg'
          }
        }
      ]
    },
    {
      moduleName: 'Choice_Multiple',
      type: 'Thinking',
      questionList: [
        {
          type: 'ChoiceLookMany',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer. beyond',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'select A ' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            rightArr: ['A', 'B']
          }
        },
        {
          type: 'ChoiceReadingMany',
          data: {
            audio: 'Question_P01.mp3',
            readAudio: 'Question_P01.mp3',
            readingText: {
              title: 'Title To people title title title title title title',
              content: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.'
            },
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer. beyond',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'select A ' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            rightArr: ['A', 'B']
          }
        },
        {
          type: 'ChoiceLongWordsMany',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer.trace of ofsensitive data from your computer.',
            lookUrl: 'Question.jpg',
            selectOptions: [
              { key: 'A', text: 'Bushwick meh permanent erasure digital trace beyon mehpermanent erasur meh permanent erasure digital tracebeyo erasure digital tracebeyo tracebeyo erasure digital tracebeyo' },
              { key: 'B', text: 'select B select B select B select B select B select B select B' },
              { key: 'C', text: 'select C select C select C select C select C select C select C' },
              { key: 'D', text: 'select D select D select D select D select D select D select D' }
            ],
            rightArr: ['A', 'B']
          }
        },
        {
          type: 'ChoiceImageMany',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards ',
            selectOptions: [
              {
                key: 'A',
                img: 'Choice_A.jpg'
              },
              {
                key: 'B',
                img: 'Choice_B.jpg'
              },
              {
                key: 'C',
                img: 'Choice_C.jpg'
              }
            ],
            rightArr: ['A', 'B']
          }
        },
        {
          type: 'ChoiceImgTextMany',
          data: {
            audio: 'Question_P01.mp3',
            question: 'standards for the permanent erasure of digital trace of ofsensitive data from your computer.',
            selectOptions: [
              {
                key: 'A',
                text: 'select A',
                img: 'Choice_A.jpg'
              },
              {
                key: 'B',
                text: 'select B select B select B select B select B select B select B',
                img: 'Choice_B.jpg'
              },
              {
                key: 'C',
                text: 'select C select C select C select C select C select C select C',
                img: 'Choice_C.jpg'
              }
            ],
            rightArr: ['A', 'B']
          }
        }
      ]
    },
    {
      moduleName: 'Drag',
      type: 'Learn',
      questionList: [
        {
          type: 'Drag',
          page: 'P01',
          data: {
            type: 'text', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow 为空的话是脑图拖拽
            title: {
              text: 'When water is solid, what can people do?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: '',
                tip: '2'
              },
              {
                content: '',
                tip: '1'
              }
            ],
            drags: [
              {
                content: 'position 1',
                targets: [1]
              },
              {
                content: 'position 0',
                targets: [0]
              },
              {
                content: 'position 2',
                targets: [2]
              },
              {
                content: 'position 2',
                targets: [2]
              },
              {
                content: 'position 2',
                targets: [2]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P02',
          data: {
            type: 'text', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'When water is solid, what can people do?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: 'bbb',
                tip: ''
              },
              {
                content: '',
                tip: '1'
              },
              {
                content: '',
                tip: '3'
              }
            ],
            drags: [
              {
                content: 'position 1',
                targets: [1]
              },
              {
                content: 'position 0',
                targets: [5]
              },
              {
                content: 'position 2',
                targets: [2]
              },
              {
                content: 'position 3',
                targets: [3]
              },
              {
                content: 'position 4',
                targets: [4]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P03',
          data: {
            type: 'text', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'When water is solid, what can people do?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: '',
                tip: '2'
              },
              {
                content: '',
                tip: '1'
              },
              {
                content: '',
                tip: '5'
              },
              {
                content: '',
                tip: '4'
              }
            ],
            drags: [
              {
                content: 'position 1',
                targets: [1]
              },
              {
                content: 'position 0',
                targets: [0]
              },
              {
                content: 'position 4',
                targets: [4]
              },
              {
                content: 'position 3',
                targets: [3]
              },
              {
                content: 'position 2',
                targets: [2]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P04',
          data: {
            type: 'text', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'When water is solid, what can people do?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: '',
                tip: '2'
              },
              {
                content: '',
                tip: '1'
              },
              {
                content: '',
                tip: '5'
              },
              {
                content: '',
                tip: '4'
              },
              {
                content: '',
                tip: '3'
              }
            ],
            drags: [
              {
                content: 'position 1',
                targets: [1]
              },
              {
                content: 'position 0',
                targets: [0]
              },
              {
                content: 'position 4',
                targets: [4]
              },
              {
                content: 'position 3',
                targets: [3]
              },
              {
                content: 'position 2',
                targets: [2]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P05',
          data: {
            type: 'text', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'When water is solid, what can people do?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: '',
                tip: '2'
              },
              {
                content: '',
                tip: '1'
              },
              {
                content: '',
                tip: '6'
              },
              {
                content: '',
                tip: '4'
              },
              {
                content: '',
                tip: '3'
              },
              {
                content: '',
                tip: '5'
              }
            ],
            drags: [
              {
                content: 'position 1',
                targets: [1]
              },
              {
                content: 'position 0',
                targets: [0]
              },
              {
                content: 'position 4',
                targets: [4]
              },
              {
                content: 'position 3',
                targets: [3]
              },
              {
                content: 'position 5',
                targets: [5]
              },
              {
                content: 'position 2',
                targets: [2]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P06',
          data: {
            type: 'img', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'Which are helpers?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: 'Branch_01',
                tip: ''
              },
              {
                content: '',
                tip: '1'
              }
            ],
            drags: [
              {
                content: 'Branch_02',
                targets: [1]
              },
              {
                content: 'Branch_03',
                targets: [5]
              },
              {
                content: 'Branch_04',
                targets: [2]
              },
              {
                content: 'Branch_02',
                targets: [3]
              },
              {
                content: 'Branch_01',
                targets: [4]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P07',
          data: {
            type: 'img', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'Which are helpers?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: 'Branch_01',
                tip: ''
              },
              {
                content: '',
                tip: '5'
              },
              {
                content: '',
                tip: '1'
              }
            ],
            drags: [
              {
                content: 'Branch_02',
                targets: [2]
              },
              {
                content: 'Branch_03',
                targets: [3]
              },
              {
                content: 'Branch_04',
                targets: [4]
              },
              {
                content: 'Branch_02',
                targets: [5]
              },
              {
                content: 'Branch_01',
                targets: [1]
              }
            ]
          }
        },
        {
          type: 'Drag',
          page: 'P08',
          data: {
            type: 'img', // type的值为text和img
            grooveType: '', //  grooveType的值为area和area-arrow
            title: {
              text: 'Which are helpers?',
              center: 'Different Doctors'
            },
            grooves: [
              {
                content: 'Branch_01',
                tip: ''
              },
              {
                content: '',
                tip: '5'
              },
              {
                content: '',
                tip: '1'
              },
              {
                content: '',
                tip: '2'
              }
            ],
            drags: [
              {
                content: 'Branch_02',
                targets: [2]
              },
              {
                content: 'Branch_03',
                targets: [3]
              },
              {
                content: 'Branch_04',
                targets: [4]
              },
              {
                content: 'Branch_02',
                targets: [5]
              },
              {
                content: 'Branch_01',
                targets: [1]
              }
            ]
          }
        }
      ]
    },
    {
      moduleName: 'DragOld',
      type: 'Learn',
      questionList: [
        {
          type: 'DragOld',
          page: 'P01',
          data: {
            mode: 'regular',
            resource: 'text', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01'
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P02',
          data: {
            mode: 'regular',
            resource: 'text', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P03',
          data: {
            mode: 'regular',
            resource: 'text', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P04',
          data: {
            mode: 'regular',
            resource: 'text', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P05',
          data: {
            mode: 'regular',
            resource: 'text', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              '',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P06',
          data: {
            mode: 'regular',
            resource: 'img', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01'
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P07',
          data: {
            mode: 'regular',
            resource: 'img', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P08',
          data: {
            mode: 'regular',
            resource: 'img', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 5
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P09',
          data: {
            mode: 'regular',
            resource: 'img', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 6
            }
            ]
          }
        },
        {
          type: 'DragOld',
          page: 'P10',
          data: {
            mode: 'regular',
            resource: 'img', // resource代表资源是img还是text 值： img || text
            audio: true,
            text: 'When water is solid, what can people do?',
            grooves: [
              '',
              'Order_01',
              '',
              '',
              '',
              ''
            ],
            drags: [{
              img: 'Order_01',
              target: 0
            },
            {
              img: 'Order_02',
              target: 2
            },
            {
              img: 'Order_03',
              target: 3
            },
            {
              img: 'Order_03',
              target: 4
            },
            {
              img: 'Order_03',
              target: 5
            }
            ]
          }
        }
      ]
    }
  ]
}
