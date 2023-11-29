

<template>
  <div class="app">
    <div class="app-body">
      <div @click="getCurrent">多语言测试：{{language}}</div>
      <div>
        <div>waimai_home machine_2字段：{{$getText("machine_2")}}</div>
        <div>
          waimai_home_f f_1字段：
          {{$getText("waimai_home_f:f_1")}}
        </div>
        <div>
          waimai_home_f f_2字段：
          {{$getText("waimai_home_f:f_2")}}
        </div>
        <div>
          waimai_home_f f_2字段：
          {{$getText("f_2", {ns: 'waimai_home_f'})}}
        </div>
        <div>
          waimai_home_f f_2字段11：
          {{getNsGetText("f_2")}}
        </div>
      </div>
      <Hello />
    </div>
    <div>
      <label>
        <input
          @change="onLanguageChange"
          :checked="getChecked('zh')"
          type="radio"
          name="fav_language"
          value="zh-CN"
        />
        简体中文
      </label>
      <br />
      <label>
        <input
          @change="onLanguageChange"
          :checked="getChecked('en')"
          type="radio"
          name="fav_language"
          value="en"
        />
        English
      </label>
      <br />
      <label>
        <input
          @change="onLanguageChange"
          :checked="getChecked('zh-HK')"
          type="radio"
          name="fav_language"
          value="zh-HK"
        />
        中文（繁体）（香港）
      </label>
      <br />
    </div>
  </div>
</template>
<script>
import Hello from './Hello.vue';
export default {
  data() {
    return {
      language: '',
    };
  },
  components: {
    Hello,
  },
  beforeMount() {
    this.language = this.$i18nClient.getCurrentLocale();
  },
  methods: {
    getChecked(curLanguage) {
      return this.language === curLanguage;
    },
    getNsGetText(key, options) {
      const t = this.$i18nClient.getFixedT(null, 'waimai_home_f');
      return t(key, options);
    },
    onLanguageChange(e) {
      const language = e.target.value;
      const i18nClient = this.$i18nClient;
      i18nClient.changeLanguage(language, (err, t) => {
        if (!err) {
          this.language = language;
          return;
        }
        console.error('==== err', err);
      });
    },
    getCurrent() {
      const currentLocale = this.$i18nClient.getCurrentLocale();
      console.log('==== currentLocale', currentLocale);
    },
  },
};
</script>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
