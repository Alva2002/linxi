<template>
  <div class="detail">
    <h1 class="title">{{ article.title }}</h1>
    <div class="list">
      <span>作者：{{article.author}}</span>
        <span>类型：{{article.category}}</span>
        <span>{{article.date}}</span>
    </div>
    <el-card class="content">
      {{ article.content }}
    </el-card>
    <div style="margin: 30px 0">
      <div style="margin: 10px 0">
        <div style="border-bottom: 1px solid orangered; padding: 10px 0; font-size: 20px">评论</div>
        <div style="padding: 10px 0">
          <el-input size="small" type="textarea" v-model="commentForm.content"></el-input>
        </div>
        <div class="pd-10" style="text-align: right">
          <el-button type="primary" size="small" @click="save">评论</el-button>
        </div>
      </div>
      <div>
        <div  style="border-bottom: 1px solid #ccc; padding: 10px 0; ">
          <div style="display: flex">
            <div style="width: 100px; text-align: center">
              <img src="@/components/img/a2.jpg" style="width: 50px; height: 50px; border-radius: 50%"></img>
            </div> <!--  头像-->
            <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px">
              <b>樱桃小王子：</b>
              <span>好文章，看完豁然开朗，给博主点赞</span>
              <div style="display: flex; line-height: 20px; margin-top: 5px">
                <div style="width: 200px;">
                  <i class="el-icon-time"></i><span style="margin-left: 5px">2023-01-21</span>
                </div>
                <div style="text-align: right; flex: 1">
                  <el-button style="margin-left: 5px" type="text" >回复</el-button>
                  <el-button type="text" style="color: red">删除</el-button>
                </div>
              </div>
            </div>   <!--  内容-->
          </div>

          <div  style="padding-left: 200px;">
            <div  style="background-color: #f0f0f0; padding: 5px 20px">
              <!--          回复列表-->
              <div style="font-size: 14px; padding: 5px 0; line-height: 25px">
                <div>
                  <b style="color: #3a8ee6">@樱桃小王子</b>
                </div>
                <div style="padding-left: 5px">
                  <b>迷人的王老五：</b>
                  <span>你说的太对了，顶你上去</span>
                </div>

                <div style="display: flex; line-height: 20px; margin-top: 5px; padding-left: 5px">
                  <div style="width: 200px;">
                    <i class="el-icon-time"></i><span style="margin-left: 5px">2023-02-21</span>
                  </div>
                  <div style="text-align: right; flex: 1">
                    <el-button style="margin-left: 5px" type="text" >回复</el-button>
                    <el-button type="text" style="color: red">删除</el-button>
                  </div>
                </div>
              </div>   <!--  内容-->
            </div>

          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id:this.$route.query.id,
      article: {},
      commentForm: {}
    }
  },
   mounted() {
    axios.get(`/api/article/${this.id}`).then(res => {
      this.article = res.data.data
}).catch(error => {
  console.log(error)
})

  },
  methods: {
    //评论
     save() {
      
    }
   },
}
</script>

<style lang="less" scoped>
.detail {
  width: 70%;
  height: 600px;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  margin:0 auto;
  span {
    margin: 0px 10px;
  }
.title{
  margin: 10px 350px;
}
.list{
  margin: 10px 350px;
font-weight: 600;
}
.content{
 padding: 20px 100px;
}
}
</style>