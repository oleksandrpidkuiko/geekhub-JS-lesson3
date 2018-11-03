'use strict';

class Tamagotchi {
    constructor(name) {
        this.name = name;
        this.happiness = 100;
        this.satiety = 100;
        this.thirst = 100;
        this.cleanliness = 100;
        this.rested = 100;
        this.died = 0;
        this.sleep = 0;
        this.lifeLoop();
    }
    getName() {
        return this.name
    }
    setName(newName) {
        this.name = newName;
    }
    play() {
        if ((this.happiness < 100)&&(!this.died)) {
            screenElem.innerText = this.name + ' грається';
            this.happiness += 10;
            happinessBar.setAttribute('aria-valuenow', this.happiness);
            happinessBar.setAttribute('style', "width:" + this.happiness + "%");
        } else {
            if ((this.happiness >= 100) && (this.died !== 1)) {
                screenElem.innerText = this.name + ' втомився від ігор';
            }
        }
    }
    feed() {
        if ((this.satiety < 100)&&(!this.died)) {
            screenElem.innerText = this.name + ' смакує смаколиком';
            this.satiety += 10;
            satietyBar.setAttribute('aria-valuenow', this.satiety);
            satietyBar.setAttribute('style', "width:" + this.satiety + "%");
        } else {
            if ((this.happiness >= 100) &&  (this.died !== 1)) {
                screenElem.innerText = this.name + ' не голодний';
            }
        }
    }
    giveToDrink() {
        if ((this.thirst < 100)&&(!this.died)) {
            screenElem.innerText = this.name + ' випиває склянку водички';
            this.thirst += 10;
            thirstBar.setAttribute('aria-valuenow', this.thirst);
            thirstBar.setAttribute('style', "width:" + this.thirst + "%");
        } else {
            if ((this.thirst >= 100) &&  (this.died !== 1)) {
                screenElem.innerText = this.name + ' не хоче більше пити';
            }
        }
    }
    wash() {
        if ((this.cleanliness < 100)&&(!this.died)) {
            screenElem.innerText = this.name + ' приймає ванну';
            this.cleanliness += 10;
            cleanlinessBar.setAttribute('aria-valuenow', this.cleanliness);
            cleanlinessBar.setAttribute('style', "width:" + this.cleanliness + "%");
        } else {
            if ((this.cleanliness >= 100) &&  (this.died !== 1)) {
                screenElem.innerText = this.name + ' чистий' ;
            }
        }
    }
    putToSleep() {
        this.sleep = 1;
        if ((this.rested < 100)&&(!this.died)) {
            screenElem.innerText = this.name + ' спить...zzzz';
            setTimeout(()=> {
                if ((this.rested < 100)&&(!this.died)) {
                    this.rested += 20;
                    restedBar.setAttribute('aria-valuenow', this.rested);
                    restedBar.setAttribute('style', "width:" + this.rested + "%");
                    screenElem.innerText = this.name + ' прокинувся';
                } else {
                    this.rested = 100;
                }
                this.sleep = 0;
            },10000);
        } else {
            if ((this.cleanliness >= 100) &&  (this.died !== 1)) {
                screenElem.innerText = this.name + ' не хоче спати';
            }
        }
    }
    death() {
        this.died = 1;
        screenElem.innerText = 'Khhhhhh..... ' + 'Help! ' + this.name + ' --- RIP ';
        let disabledBtns = circle.querySelectorAll('button');
        disabledBtns.forEach((elem) => {
            elem.setAttribute('disabled', true);
        })
    }
    lifeLoop() {
        let loop = setInterval(() => {
            if (!this.sleep) {
                this.happiness -= 20;
                this.satiety -= 10;
                this.thirst -= 10;
                this.cleanliness -= 10;
                this.rested -= 20;
            } else {
                this.satiety -= 5;
                this.thirst -=5;
                this.cleanliness -=5;
            }
            happinessBar.setAttribute('aria-valuenow', this.happiness);
            happinessBar.setAttribute('style', "width:" + this.happiness + "%");
            satietyBar.setAttribute('aria-valuenow', this.satiety);
            satietyBar.setAttribute('style', "width:" + this.satiety + "%");
            thirstBar.setAttribute('aria-valuenow', this.thirst);
            thirstBar.setAttribute('style', "width:" + this.thirst + "%");
            cleanlinessBar.setAttribute('aria-valuenow', this.cleanliness);
            cleanlinessBar.setAttribute('style', "width:" + this.cleanliness + "%");
            restedBar.setAttribute('aria-valuenow', this.rested);
            restedBar.setAttribute('style', "width:" + this.rested + "%");
            if ((this.happiness <= 0) || (this.satiety <= 0) || (this.thirst <= 0) || (this.cleanliness <= 0) || (this.rested <= 0)) {
                this.death();
                clearInterval(loop);
            }
        }, 5000);
    }
}
let tami = new Tamagotchi('Tami');
const playBtn = document.querySelector('#play');
const feedBtn = document.querySelector('#feed');
const giveToDrinkBtn = document.querySelector('#giveToDrink');
const washBtn = document.querySelector('#wash');
const putToSleepBtn = document.querySelector('#putToSleep');
const circle = document.querySelector('#circle');
const screenElem = document.querySelector('#screen');
const happinessBar = document.querySelector('#happiness');
const satietyBar = document.querySelector('#satiety');
const thirstBar = document.querySelector('#thirst');
const cleanlinessBar = document.querySelector('#cleanliness');
const restedBar = document.querySelector('#rested');
playBtn.addEventListener('click', tami.play.bind(tami));
feedBtn.addEventListener('click', tami.feed.bind(tami));
giveToDrinkBtn.addEventListener('click', tami.giveToDrink.bind(tami));
washBtn.addEventListener('click', tami.wash.bind(tami));
putToSleepBtn.addEventListener('click', tami.putToSleep.bind(tami));
circle.addEventListener('click', () => {circle.classList.add('animate')});



