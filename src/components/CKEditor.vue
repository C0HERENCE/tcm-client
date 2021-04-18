<template>
  <div>
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
export default {
  name: 'ckeditor4',
  data() {
    return {
      id: parseInt(Math.random() * 10000).toString(),
      ckeditor: null
    }
  },
  props: [
    'value'
  ],
  mounted: function () {
    const self = this;
    self.ckeditor = window.CKEDITOR.replace(self.id, {
      height: '500',
      toolbar: [
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'EmojiPanel'] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
        '/',
        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
      ],
      language: 'zh-cn',
    })
    self.ckeditor.setData(self.value)
    self.ckeditor.on('change', function () {
      self.$emit('input', self.ckeditor.getData())
    })
  },
  watch: {
    value: function () {
      if (this.value !== this.ckeditor.getData()) {
        this.ckeditor.setData(this.value)
      }
    }
  },
  beforeDestroy: function () {
    this.ckeditor.destroy()
  }
}
</script>