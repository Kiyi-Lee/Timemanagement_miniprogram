var boardArr =[
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'0'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'1'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'2'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'3'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'4'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'5'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'6'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'7'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'8'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'9'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'10'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'11'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'12'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'13'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'14'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'15'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'16'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'17'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'18'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'19'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'20'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'21'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'22'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'23'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'24'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'25'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'26'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'27'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'28'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'29'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'30'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'31'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'32'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'33'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'34'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'35'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'36'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'37'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'38'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'39'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'40'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'41'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'42'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'43'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'44'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'45'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'46'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'47'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'48'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'49'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'50'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'51'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'52'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'53'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery1.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'54'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery2.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'55'},
  {icon:'https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/mystery3.png?sign=4c502f3e5dde1389003fab7ea383e286&t=1617980889',text:'56'},
]


var array0 = [
  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/can.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 0
  
  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/duck.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 1

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/luckfish.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 2

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/cloud.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 3

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/calm1.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 4

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/coolduck.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 5

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/dancecat.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 6
  
  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/textmove.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 7

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/ringdang.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 8

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5ufcMycu8LnqPc.p4j6ESTgUIwBxvF07LIvn2AEwdvL6qehrNxVvussw9bKrq14oo95h6qpmYOSbBRMfSn.1SmE!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 9

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5l4nIO9tguZYFPLP4Clec8GnY6fKaSLb6Vmv23*Z591Mj8Q94P7F3Y09lp5E32Mao4jiUAcA99rtlZTkLD3IbPk!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 10

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5l4nIO9tguZYFPLP4Clec8G2GFThAfOrd8oau.WV9l6H.bG3kc1UlJjn8pxLIjZrYpDxA*xJEYgvRTEU6MT80s4!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 11

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5ivlrzMFH47uND21tpRMzDLP0Owl65lvTnIAwEchB1ykRCRXAxZOLZdMIrF0syLIr6txHpvkbAmfKtrUO.AFnl4!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 12

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5ivlrzMFH47uND21tpRMzDJxJylaP6.2cKrwh7OKOtXXNhGH2DTd.PpYR5QdugYerCMHmRcSlNsIxOMJqBBEmvw!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 13

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/surpriseRabbit.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 14

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/sportanimal.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 15

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/forest.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 16

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5t9KPX*KWbneyYlZgfr2Ec1CUuabviQwV4BSi1pSb*vd30Z3jelFsHi9FumDp2LeHRTCbOUCpJVd7OqXBLCCWhI!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 17

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5p3lDui0TtZKVe3OPl2VjFEv1O927UCMQaXl*6cp*lMgy5CA9w8HmyjwNUZjhS*Hlfz6x9NkFv3MCBuBpVRyKF8!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 18

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5p3lDui0TtZKVe3OPl2VjFH.33aareQtag9QArBSXSEtDmjothSQ0lYnxqPIlJcauJ2EPk.2hGeV4kq2RNSzLcU!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 19

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/shysheep.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 20

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5iG.4Yw5.npTHuWJN0VpoGp23.zQpTAo5Irb4YXCtfIGzuiH0Jazhyb65C.ZwN46fgKanhPYCL0FI0onsI*GSgQ!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 21

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5kaj5Qtq7NvDHcygS81cCOSubfyRnDHzJRnfe*HiISXBBbQBGqeMXqFReEk9paQIxeE4sb*bOgOetAIGWZ3XpVs!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 22

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/football.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 23

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5vU0U2hVWUqQnwFlZBtww0O4grfo097LC41VWdlykXVG9vefN26*OtNu.uA05k5UA1mNzWNvbh0AloHnCDcwmIE!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 24

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/luckman.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 25

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5gvjzHxAQnIv3hGC.GN8cTrstTCscOI0WiT8wwU9nNh.8KQGwJUhdqKJXNZqDr29oCLFqatXyiALZRb4IvlT2wg!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 26

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/magicPole.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 27

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/jumpbird.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 28

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/floatFlower.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 29

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5pFRWRCDfpbkBDRp*RvBu8GMvTuDZqU3eHEU4smpTwjeQkFUB9AjZyjrx.SJhtkjRC2A8oRKf46tes*ZwoZuopA!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 30

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/fox.png?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 31

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/fourleaf.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 32

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5glqk25czwGKbzVPU*OJPxp0Bfj3A8997caHbVLoenihXYzDyArvbINEvvdUHCh0VZTQm6rh5aXQxyE.Vsf1e74!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 33

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/cooldog.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 34

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/noquestion.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 35

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/luckgirl.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 36

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/hicat.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 37

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5u6dO3NpFzIummnMCjsQuJVQSFXEb9jIsDPcmyDzbjkETe5g*PkNP.1jNA*.MzOyJQ.6d01s7r7UAlfTiNWmnLE!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 38

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/ball.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 39

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5s1Mg5Z0Ul0jQLTJhS5xnpeKYAXeRHOxCkKpFns162O9rTXcx1BV01j30V0U96Pb2b2rVmxD4loNzFSxD*2NPb0!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 40

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/rainbow.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 41

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/Text.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 42

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/bird.png?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 43

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/jump.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 44

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/pig.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 45

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/beautifulSense.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 46

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/smile.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 47

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/bling.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 48

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/tea.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 49

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/progress.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 50

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/code.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 51

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/photo.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 52

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/winedog.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 53

  "http://m.qpic.cn/psc?/V54SEG1R4QYpan3jCAtq3tUSOa2ECCxB/ruAMsa53pVQWN7FLK88i5pJrsjzgKh9nupApuk34Tl4h1kZIotV0m4PNTWP66UDFI6cCjenYGsWcZZavqN1jP1LJDMUu2Yy9MOX1wsRptMM!/mnull&bo=BAEEAQAAAAADByI!&rf=photolist&t=5",     // 54

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/win.jpg?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 55

  "https://636c-cloud1-6g5wybika29da54a-1305336167.tcb.qcloud.la/openflower.gif?sign=fc68830ebbdb3fed68f3544a5e6d5eaa&t=1617980992",     // 56

]
 //数据暴露出去
 module.exports = {  
  boardArr: boardArr,
  array0: array0
}