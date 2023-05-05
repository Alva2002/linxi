<template>
  <div class="home">
    <div class="content">
      <div class="tag">
        <!-- 遍历标签数组 -->
        <el-row :gutter="20">
          <el-col :span="3" v-for="(item, index) in tags" :key="index">
            <div class="grid-content bg-purple">
              <el-tag :type="types[Math.floor(Math.random() * types.length)]">{{
                item
              }}</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="article">
        <div class="a-left">
          <img class="a-img" src="@/assets/main/person.png" alt="">
        </div>
        <div class="a-right">
          <!------------- 面包屑（搜索结果/点击便签结果列表）------------------ -->
          <div class="up">
            
          </div>
          <!-- ---文章列表----------- -->
          <div class="down">
              <Article :articles='articles'></Article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Article from '@/components/Article.vue'
export default ({
  components: {
    Article
  },
  data() {
    return {
      articles: [],
      isShow: false, //背景文字
      text: "",
      textColor: "",
      textArray: [
        "犹豫一万次，不如实践一次",
        "鸡汤再有理，终究是别人的总结",
        "争气永远比生气聪明！",
        "请把努力当成一种习惯",
        "到处留心皆学问",
        "选择你所喜欢的，喜欢你所选择的",
        "边学边问，才有学问",
        "最大的错误是担心犯错",
        "自信是成功的第一诀窍",
        "心小了，所以小事变大了",
      ],
      colorArray: [
        "#FF6A6A",
        "#FF7F50",
        "#FFD700",
        "#ADFF2F",
        "#7CFC00",
        "#00FFFF",
        "#87CEFA",
        "#FF69B4",
        "#EE82EE",
        "#8A2BE2",
      ],
      tags: [
        "前端框架",
        "vue",
        "html",
        "css",
        "javascript",
        "regular",
        "react",
        "vue3",
        "TypeScript",
        "tree.js",
        "测试开发",
      ],
      types: ["success", "info", "warning", "danger", ""],
    }
  },
    mounted() {
    axios.get('/api/article').then(res => {
        this.articles = res.data.data
      })
  },
  methods: {
    //点击背景层
    showText(event) {
      this.isShow = true;
      this.text =
        this.textArray[Math.floor(Math.random() * this.textArray.length)];
      this.textColor =
        this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
      //确保 textElem 已经被渲染出来,再做计算

      this.$nextTick(() => {
        let textElem = this.$refs.text;
        textElem.style.left = event.clientX - textElem.offsetWidth / 2 + "px";
        textElem.style.top = event.clientY - textElem.offsetHeight / 2 + "px";
        //2.5秒之后修改状态
        setTimeout(() => {
          this.isShow = false;
        }, 2500);
      });
    },
  },
})
</script>

<style scope lang="less">
.home {
  width: 100%;
  height: 100vh;
  background-color: white;
  position: relative;
  .content {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    .tag {
      width: 80%;
      height: 130px;
      align-self: flex-end;
      .el-row {
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
        margin: 5px;
        .el-col {
          margin-top: 6px;
          border-radius: 4px;
          .grid-content {
            text-align: center;
            border-radius: 4px;
            min-height: 50px;
            cursor: pointer;
            .el-tag{
              font-size: 18px;
            }
          }
        }
      }
    }
    .article {
      width: 100%;
      height: 90%;

      .a-left {
        width: 20%;
        height: 100%;
        float: left;
   .a-img{
    width: 100%;
    height: 100%;
   }
   }
      .a-right {
        float: right;
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .up{
          width: 100%;
          height: 50px;
          margin-left: 30px;
          border-bottom: 1px solid green;
       .el-breadcrumb {
    padding: 0 20px;
    font-size: 17px;
    line-height: 3;
    height: 50px;
}   
        }
        .down{
          width: 100%;
          height: 98%;
          margin-top: 20px;
        }
      }
    }
  }
 
  .text-container {
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 100px;
    justify-content: space-around;
    align-items: center;
    img {
      width: 70px;
      height: 80px;
    }
    .text {
      font-size: 18px;
      height: 20px;
      font-weight: 800;
      text-align: center;
      animation: fadein 2s;
    }
    @keyframes fadein {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  }
}
</style>