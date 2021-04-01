<template>
  <b-container>
    <b-row>
      <b-col cols="3">
        <CategoryList></CategoryList>
      </b-col>
      <b-col cols="6">
        <a-card>
          <p>card content</p>
          <p>card content</p>
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
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        'Ant Design, a design m.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
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
    };
  },
}
</script>

<style scoped>

</style>