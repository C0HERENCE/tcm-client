<template>
  <b-container>
    <b-row>
      <b-col cols="3">
        <CategoryList></CategoryList>
      </b-col>
      <b-col cols="6">
        <a-input-search
            placeholder="输入关键词搜索帖子"
            enter-button="搜索"
            size="large"
            @search="onSearch"
        />
        <a-card class="my-1" size="small">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <a slot="title" href="#">[置顶] {{ item.title }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
        <a-menu slot="title" mode="horizontal">
          <a-menu-item key="all"> 所有</a-menu-item>
          <a-menu-item key="mail"> 精华</a-menu-item>
          <a-menu-item key="sort"> 排序</a-menu-item>
        </a-menu>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <template v-for="{ type, text } in actions" slot="actions">
              <span :key="type">
                <a-icon :type="type" style="margin-right: 8px"/>
                {{ text }}
              </span>
            </template>
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">{{ item.title }}</a>
              <a-avatar slot="avatar" :src="item.avatar"/>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </a-list>
      </b-col>
      <b-col cols="3">
        <AboutMe></AboutMe>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CategoryList from "@/components/forum/CategoryList";
import AboutMe from "@/components/forum/AboutMe";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '#',
    title: `中医药知识科普 帖子${i+1}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        '10分钟前',
    content:
        '文章内容，求助内容，科普内容的梗概...',
  });
}
const data = [
  {
    title: '置顶帖子标题 1',
  },
  {
    title: '置顶帖子标题 2',
  },
];
export default {
  name: "Category",
  components: {CategoryList, AboutMe},
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        {type: 'star-o', text: '156'},
        {type: 'like-o', text: '156'},
        {type: 'message', text: '2'},
      ],
      data,
    };
  },
  methods: {
    onSearch() {

    }
  },
}
</script>

<style scoped>

</style>