<template>
  <div id="cropperImg">
    <!-- <img src="../../assets/images/test1.jpg" alt=""> -->
    <slot></slot>
  </div>
</template>

<script>
import $ from "jquery";
import "jquery-cropper/dist/jquery-cropper.esm";

export default {
  mounted() {
    //   this.cropperCreate()
  },
  methods: {
    cropperCreate() {
      let $img = $("#cropperImg img");

      $img.cropper({
        crop: function(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        }
      });

      // Get the Cropper.js instance after initialized
      var cropper = $img.data("cropper");
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../../assets/cropper.css');
#cropperImg{
    width: 200px;
    height: 200px;
}
img {
  max-width: 100%; /* This rule is very important, please do not ignore this! */
}
</style>

