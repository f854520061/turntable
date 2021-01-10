import './css/main.css';
import Vue from 'vue/dist/vue.esm';
import personData from './data/personData';
 
function stopScrolling(event) {
    event.preventDefault();
}
// 阻止苹果自动滑动事件
// document.addEventListener('touchmove',stopScrolling,{passive: false});

const app = new Vue({
    el: '#root',
    data: {
        turnableArr: {
            1: {
                active: 0,
                label: '拖地',
                person: 3,
                type: 1,
                personList: []
            },
            2: {
                active: 0,
                label: '休闲区',
                person: 1,
                personList: []
            },
            3: {
                active: 0,
                label: '浇花',
                person: 1,
                personList: [],
                user: 10
            },
            4: {
                active: 0,
                label: '大门前台',
                person: 2,
                personList: []
            },
            5: {
                active: 0,
                label: '茶水两排',
                person: 2,
                personList: []
            },
            6: {
                active: 0,
                label: '三个办公室',
                person: 3,
                personList: []
            },
            7: {
                active: 0,
                label: '扫地',
                person: 3,
                personList: []
            },
            8: {
                active: 0,
                label: '茶水间',
                person: 1,
                personList: []
            },
            9: {
                active: 0,
                label: '会议室',
                person: 1,
                personList: []
            },
            10: {
                active: 0,
                label: '倒垃圾',
                person: 1,
                personList: []
            }
        }
    },
    methods: {
        startGame: function () {
            if (timer || finish) return;
            clear(this.turnableArr);
            let pArr = Object.keys(personData),
                idx = 1;
            const d = Object.assign({}, this.turnableArr);
            startAnimation(d);
            const promise = new Promise(resolve => {
                try {
                    resolve(checkPerson(this.turnableArr, pArr, idx));
                } catch (e) {
                    console.log(e);
                }
            });
            loopPromise(promise);
        }
    }
})

let finish = false;
// 循环执行promise
function loopPromise (promise) {
    Promise.resolve(promise).then(res => {
        setTimeout(() => {
            if (res.idx == (Object.keys(app.turnableArr).length) && !res.data[res.idx].person) {
                endAnimation();
                timer = null;
                finish = true;
            } else {
                loopPromise(Promise.resolve(checkPerson(res.data, res.persons, res.idx)))
            }
        },100)
    })
}

// 选人分工
function checkPerson (data, persons, idx) {
    const len = persons.length;
    let index = random(0, len);

    console.log(data[idx]);
    if (data[idx].person > 0) {
        if (data[idx].user) {
            index = persons.findIndex(s => s == data[idx].user);
        }
        if (data[idx].type && personData[persons[index]].sex === 2) { // 拖地且女生
            return checkPerson(data, persons, idx);
        }
        data[idx].personList.push(personData[persons[index]].name)
        persons.splice(index, 1);
        data[idx].person--;
    } else {
        idx++;
        return checkPerson(data, persons, idx);
    }

    return {
        data,
        persons,
        idx
    }
}
// 取指定区间随机整数 
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function clear (data) {
    for (let i in data) {
        data[i].personList = [];
    }
}

let timer = null;
function startAnimation (data) {
    let key = 1;
    const ar = Object.keys(data);
    timer = setInterval(() => {
        if (key > ar[ar.length - 1]) {
            key = 1;
        }
        for (let i in data) {
            data[i].active = 0
        }
        data[key++].active = 1;
    }, 100)
}
function endAnimation () {
    // 消除计时器
    clearInterval(timer);
}