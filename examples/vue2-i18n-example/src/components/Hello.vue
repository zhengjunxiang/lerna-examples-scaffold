<template>
  <div>
    <h3>内部组件</h3>
    <div>单复数测试：{{$getText('demo_key_apple', {pluralCount: 1})}}</div>
    <div>单复数测试：{{$getText('demo_key_apple', {pluralCount: 30})}}</div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
};
</script>

<style>
</style>