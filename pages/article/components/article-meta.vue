<template>
  <div>
    <div class="article-meta">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
          }" 
          class="author"
        >
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.areatedAt | date('MMM DD,YYYY')}}</span>
      </div>
      <button 
        class="btn btn-sm btn-outline-secondary" 
        :class="{active: article.author.following}"
        :disabled="followDisabled"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
          {{article.author.following ? 'Unfollow' : 'Follow'}} {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button 
        class="btn btn-sm btn-outline-primary" 
        :class="{active: article.favorited}"
        :disabled="article.favoriteDisabled"
        @click="onFavorite">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </div>
  </div>
</template>

<script>
import { followUser, unfollowUser, deleteFavorite, addFavorite } from '@/api/article'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      followDisabled: false
    }
  },
  methods: {
    async onFollow () {
      this.followDisabled = true
      if (this.article.author.following) {
        // 取消关注
        await unfollowUser(this.article.author.username)
        this.article.author.following = false
      } else {
        // 添加关注
        await followUser(this.article.author.username)
        this.article.author.following = true
      }
      this.followDisabled = false
    },
    async onFavorite () {
      this.article.favoriteDisabled = true
      if (this.article.favorited) {
        // 取消点赞
        await deleteFavorite(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount += 1
      }
      this.article.favoriteDisabled = false
    }
  }
}

</script>

<style lang='less' scoped>

</style>
