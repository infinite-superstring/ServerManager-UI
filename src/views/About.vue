<script setup>

</script>

<template>
  <v-card title="关于ServerManager" class="pageMain-card">
    <v-card-text class="pa-4">
      <div class="about">
        <p>
          ServerManager，一款高性能、易用的服务器集群管理工具。通过先进的技术和丰富的功能设计，它为用户提供了全面的服务器集群管理解决方案，助力用户轻松驾驭复杂的服务器集群环境，提升业务运行效率和稳定性。</p>
        <dl>
          <dd>
            后端： Python + Django
          </dd>
          <dt>
            Django，作为Python的高性能Web框架，以其“快速开发、安全、可维护”的特性，为系统后端提供了强大的支持。通过Django，我们能够高效地构建复杂的数据模型和强大的API接口，支撑起系统的各项核心功能。<br/>
          </dt>
          <dd>前端： Vue 3 + Vuetify.js</dd>
          <dt>
            Vue 3，作为现代JavaScript框架，以其响应式系统和组件化开发模式，为前端界面的构建提供了极高的灵活性和效率。结合Vuetify.js这一基于Vue的Material
            Design组件库，我们打造了直观、美观且用户友好的操作界面，提升了整体的用户体验。
          </dt>
        </dl>
        <br/>
        <p>
          Copyright &copy; <a href="https://github.com/infinite-superstring">Infinite Superstring</a>
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.about {
  text-indent: 2em;

}
</style>
