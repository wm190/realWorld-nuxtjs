<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <article-meta :article="article"></article-meta>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12" v-html="article.body"></div>
        </div>

        <hr />

        <div class="article-actions">
          <article-meta :article="article"></article-meta>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <article-comments :article="article"></article-comments>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtile } from '@/api/article'
import MarkDownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
  components: {
    ArticleMeta,
    ArticleComments
  },
  data() {
    return {};
  },
  // 设置页面meta优化SEO
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  },
  async asyncData ( { params } ) {
    const { data } = await getArtile(params.slug)
    const md = new MarkDownIt()
    const { article } = data
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  }
};
</script>

<style lang='less' scoped>
</style>
