<template>
  <ul>
    <li class="row" v-for="article in articles" :key="article.id" @click="$router.push('/articledetail?id='+article.id)">
      <span>
        <h3>{{article.title}}</h3>
        <span>作者：{{article.author}}</span>
        <span>类型：{{article.category}}</span>
        <span>{{article.date}}</span>
        <span>点赞数：{{article.likes}}</span>
        <span>收藏数：{{article.favorites}}</span>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["articles"],
};
</script>

<style lang="less" scoped>
.row {
  width: 100%;
  height: 80px;
  list-style: none;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  transition: 0.3s;
  cursor: pointer;
  margin-top: 40px;
  span {
    margin: 0px 10px;
  }
}
.row:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>