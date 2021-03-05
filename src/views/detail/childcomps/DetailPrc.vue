<template>
  <div id="detailprc" v-if="Object.keys(goodprc).length !== 0">
    <span class="in-prc">￥{{ goodprc.in_prc | getFloat2 }}</span>
    <span class="oto-prc">{{ goodprc.oto_prc | getFloat2 }}</span>
    <span class="vip-prc">
      距开始仅剩
      <p>
        <span id="hour">01</span> : <span id="min">03</span> : <span id="sec">06</span>
      </p>
    </span>
  </div>
</template>
<script>
export default {
  name: "DetailPrc",
  props: {
    goodprc: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      timeID: null,
    };
  },
  filters: {
    // 传入字符串，返回保留两位小数的数字
    getFloat2: function (x) {
      if (x != ".") {
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf(".");
        if (rs <= 0) {
          rs = s.length;
          s += ".";
        }
        while (s.length <= rs + 2) {
          s += "0";
        }
        return s;
      } else {
        return "0.00";
      }
    },
  },
  mounted() {
    this.timeID = setInterval(() => {
      this.setseckilltime();
    }, 1000);
  },
  methods: {
    setseckilltime() {
      //1.获取元素和文本
      let hour = document.getElementById("hour");
      let min = document.getElementById("min");
      let sec = document.getElementById("sec");

      //(1)获取当前时分秒
      let h = hour.innerText; //字符串
      let m = min.innerText;
      let s = sec.innerText;
      //（2）s--
      s--; //隐式转换  Number(s)--

      //（3）如果s  < 0, s = 59, m--
      if (s < 0) {
        s = 59;
        m--;
      }

      // (4) 如果m < 0, m = 59, h--
      if (m < 0) {
        m = 59;
        h--;
      }
      //（5）如果 m h s < 10,需要在前面加上0
      /*字符串类型在和number计算之前，最好转成number
       */
      s = parseInt(s);
      m = parseInt(m);
      h = parseInt(h);

      //  表达式?代码1：代码2
      s = s < 10 ? "0" + s : s;
      m = m < 10 ? "0" + m : m;
      h = h < 10 ? "0" + h : h;

      // (6) 将计算好的时分秒赋值给页面元素的文本
      hour.innerText = h;
      min.innerText = m;
      sec.innerText = s;
      // （7）如果 h == 0 && m == 0 && s == 0,清除定时器
      if (h == 0 && m == 0 && s == 0) {
        clearInterval(this.timeID);
      }
    },
  },
  destroyed() {
    clearInterval(this.timeID);
  },
};
</script>
<style scoped>
*,
span {
  margin: 0;
  padding: 0;
}
#detailprc {
  background: url("https://img12.360buyimg.com/img/s750x100_jfs/t1/119650/20/7754/47352/5ed632eaE8b4d8095/1e2456ef7139c95f.png")
    no-repeat;
  width: 100%;
  height: 50px;
  background-size: 100% auto;
  color: white;
  padding: 5px 0 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.in-prc {
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  /* margin-left: -2px; */
}
.vip-prc {
  right: 0;
  color: var(--color-high-text);
  width: 30%;
  font-size: 13px;
  text-align: center;
}
.vip-prc p {
  color: black;
  margin-top: 5px;
}
.vip-prc p span {
  background-color: var(--color-high-text);
  color: white;
  border-radius: 5px;
  border: 2px solid var(--color-high-text);
}
.oto-prc {
  text-decoration: line-through;
  margin-left: 20px;
}
</style>