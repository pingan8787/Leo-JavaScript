<script setup lang="ts">
import { ref, onMounted } from "vue";

// defineProps<{ msg: string }>()

const count = ref(0);

/**
 * options.selectedDate 格式类似'2014/01/01'
 */

const defaultOptions = {
  selectedDate: new Date().toLocaleDateString(),
};

class Calendar {
  constructor(options = defaultOptions) {
    this.options = options;
    this.init();
  }
  options;
  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth();
  monthTag = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  day = this.today.getDate();
  days = document.getElementsByTagName("td");
  selectedDay: any;
  setDate: any; // 当天
  daysLen = this.days.length;

  init() {
    this.initOptions();
    this.draw();
  }

  initOptions() {
    if (this.options) {
      this.setDate = new Date(this.options.selectedDate);
      this.day = this.setDate.getDate();
      this.year = this.setDate.getFullYear();
      this.month = this.setDate.getMonth();
    }
  }

  draw() {
    this.drawDays();
    const pre = document.getElementsByClassName("pre-button");
    const next = document.getElementsByClassName("next-button");
    const that = this;

    pre[0].addEventListener("click", function () {
      that.preMonth();
    });
    next[0].addEventListener("click", function () {
      that.nextMonth();
    });

    while (this.daysLen--) {
      this.days[this.daysLen].addEventListener("click", function () {
        that.clickDay(this);
      });
    }
  }

  drawDays() {
    const startDay = new Date(this.year, this.month, 1).getDay();
    // 下面表示这个月总共有几天
    const nDays = new Date(this.year, this.month + 1, 0).getDate();
    let n = startDay;

    // 清除原来的样式和日期
    for (let k = 0; k < 42; k++) {
      this.days[k].innerHTML = "";
      this.days[k].id = "";
      this.days[k].className = "";
    }

    for (let i = 1; i <= nDays; i++) {
      this.days[n].innerHTML = i.toString();
      n++;
    }

    for (let j = 0; j < 42; j++) {
      if (this.days[j].innerHTML === "") {
        this.days[j].id = "disabled";
      } else if (j === this.day + startDay - 1) {
        if (
          this.month === this.setDate.getMonth() &&
          this.year === this.setDate.getFullYear()
        ) {
          this.drawHeader(this.day);
          this.days[j].id = "today";
        }
      }
      if (this.selectedDay) {
        if (
          j === this.selectedDay.getDate() + startDay - 1 &&
          this.month === this.selectedDay.getMonth() &&
          this.year === this.selectedDay.getFullYear()
        ) {
          this.days[j].className = "selected";
          this.drawHeader(this.selectedDay.getDate());
        }
      }
    }
  }

  drawHeader(elem: any) {
    let headMonth = document.getElementsByClassName("header-date-text");

    headMonth[0].innerHTML =
      this.year + "." + this.monthTag[this.month] + "." + this.day;
  }

  clickDay(curDay: any) {
    // TODO: 可以用来高亮当天待办的内容
  }
  preMonth() {
    if (this.month < 1) {
      this.month = 11;
      this.year = this.year - 1;
    } else {
      this.month = this.month - 1;
    }
    this.drawHeader(1);
    this.drawDays();
  }
  nextMonth() {
    if (this.month >= 11) {
      this.month = 0;
      this.year = this.year + 1;
    } else {
      this.month = this.month + 1;
    }
    this.drawHeader(1);
    this.drawDays();
  }

  setCookie(name: any, expiredays: any) {
    let expires = "";
    if (expiredays) {
      const date: any = new Date();
      date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + this.selectedDay + expires + "; path=/";
  }
}

onMounted(() => {
  const calendar = new Calendar();
});

const dayTitle = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
</script>

<template>
  <div class="elegant-calencar">
    <div id="header" class="clearfix">
      <div class="header-date">
        <div class="header-date-text"></div>
      </div>
      <div class="header-button">
        <div class="pre-button" title="查看上个月">&lt;</div>
        <div class="next-button" title="查看下个月">&gt;</div>
      </div>
    </div>
    <table id="calendar-day">
      <thead>
        <tr>
          <th v-for="(d, i) in dayTitle" :key="i">{{ d }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dx, ix) in [1, 2, 3, 4, 5, 6]" :key="ix">
          <td v-for="(d, i) in dayTitle" :key="i"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.elegant-calencar {
  width: 100%;
  box-shadow: 0 10px 40px -10px rgb(0 64 128 / 20%);
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;

  #header {
    display: flex;
    font-size: 20px;
    padding: 0 8px;
    .header-date {
      flex: 2;
      text-align: left;
      color: #101010;
    }
    .header-button {
      flex: 1;
      display: flex;
      justify-content: end;
      div {
        margin-left: 12px;
        color: #5b5b5b;
        cursor: pointer;
        font-size: 18;
      }
    }
  }

  #calendar-day {
    width: 100%;
    tr {
      height: 2em;
      line-height: 2em;
    }
    thead tr {
      color: #5b5b5b;
      font-weight: 700;
      text-transform: uppercase;
    }

    tbody tr {
      color: #252a25;
    }

    tbody td {
      width: 14%;
      border-radius: 50%;
      cursor: pointer;
      -webkit-transition: all 0.2s ease-in;
      transition: all 0.2s ease-in;
    }

    tbody td:hover,
    .selected {
      color: #fff;
      border: none;
      background-color: #5b5b5b;
    }

    tbody td:active {
      -webkit-transform: scale(0.7);
      -ms-transform: scale(0.7);
      transform: scale(0.7);
    }
  }

  #today {
    background-color: #18a058;
    color: #fff;
    border-radius: 50%;
  }

  #disabled {
    cursor: default;
    background: #fff;
    &:hover {
      background: #fff!important;
      color: #c9c9c9!important;
    }
  }
}
</style>
