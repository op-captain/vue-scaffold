<template>
  <div class="wrap">
    <h2>个人中心abc</h2>
    <h3></h3>
    <p>Normal upload(File max size 1MB):</p>
    <div id="wrap" style="display:none">
      <cube-upload
        ref="upload"
        :action="action"
        :simultaneous-uploads="1"
        @files-added="filesAdded"
        @file-submitted="fileSubmitted"
      />
      <cube-button @click="upload" v-if="!isUploading">Upload</cube-button>
      <cube-button @click="pause" v-else>Pause</cube-button>
      <cube-button @click="retry">Retry</cube-button>
    </div>
    <span class="btn btn-success fileinput-button">
      <i class="glyphicon glyphicon-plus"></i>
      <span>Select files...</span>
      <!-- 这个name:file的名字 要和后端req.file名字一致 -->
      <input id="fileupload" type="file" name="file" multiple>
    </span>
    <div id="progress" class="progress">
      <div class="progress-bar progress-bar-success"></div>
    </div>
    <div id="files" class="files"></div>
    <cropper ref="corpper">
      <img v-if="cropperUrl" :src="cropperUrl" alt>
    </cropper>
  </div>
</template>

<script>
//上传示例 https://github.com/didi/cube-ui/tree/dev/example/pages/upload
import $ from "jquery";
import "../utils/lib/jQuery-File-Upload/canvas-to-blob.min.js";
import "../utils/lib/jQuery-File-Upload/jquery.iframe-transport.js";
import "../utils/lib/jQuery-File-Upload/jquery.fileupload.js";
import "../utils/lib/jQuery-File-Upload/jquery.fileupload-image.js";
// import "../utils/lib/exif.js"

/**
 * 
 * 
 //定义一个文件阅读器
        var reader = new FileReader();

        //文件装载后将其显示在图片预览里
        reader.onload = function() {
          // $("#img_preview").attr("src", this.result);
          var bf = this.result;
          var blob = new Blob([bf], { type: "text/plain" });

          that.cropperUrl = URL.createObjectURL(blob);

          that.$nextTick(() => {
            //初始化裁剪插件
            that.$refs.corpper.cropperCreate();
          });
        };

        //装载文件
        reader.readAsArrayBuffer(data.originalFiles[index]);
 */
export default {
  mounted() {
    var that = this;
    ("use strict");
    // Change this to the location of your server-side upload handler:
    var url = "http://192.168.1.109:3000/api/v1/upload",
      uploadButton = $("<button/>")
        .addClass("btn btn-primary")
        .prop("disabled", false)
        .text("Processing...")
        .on("click", function() {
          var $this = $(this),
            data = $this.data();
          $this
            .off("click")
            .text("Abort")
            .on("click", function() {
              $this.remove();
              data.abort();
            });
          data.submit().always(function() {
            $this.remove();
          });
        });
    //option api https://github.com/blueimp/jQuery-File-Upload/wiki/Options
    $("#fileupload")
      .fileupload({
        url: url,
        dataType: "json",
        autoUpload: false,
        loadImageFileTypes: /^image\/(gif|jpeg|png|bmp|svg\+xml)$/, //图片格式
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i, //文件格式
        maxFileSize: 999000,
        // // Enable image resizing, except for Android and Opera,
        // // which actually support image resizing, but fail to
        // // send Blob objects via XHR requests:
        // disableImageResize: /Android(?!.*Chrome)|Opera|/.test(
        //   window.navigator.userAgent
        // ),
        //disableExif true 和  previewCanvas false 同时配置，才能让移动端的图片方向正确
        disableExif: true, //避免移动端图片方向不正确，PC端 false和 true都可以
        previewCanvas: false, //预览图使用 img 而不是 canvas。
        previewMaxWidth: 200, //预览图的大小
        previewMaxHeight: 200,
        // previewCrop: true, //统一正方形预览图，但是移动端会图片方向会不正确
        beforeSend: function(xhr, data) {
          // xhr.setRequestHeader("Access-Control-Request-Headers", "accept, origin, authorization");
        }
      })
      .on("fileuploadadd", function(e, data) {
        console.log(window.navigator.userAgent);
        data.context = $("<div/>").appendTo("#files");
        $.each(data.files, function(index, file) {
          var node = $("<p/>").append($("<span/>").text(file.name));
          if (!index) {
            node.append("<br>").append(uploadButton.clone(true).data(data));
          }
          node.appendTo(data.context);
        });
      })
      .on("fileuploadprocessalways", function(e, data) {
        console.log(data);

        function toBlob(file, callback) {
          //定义一个文件阅读器
          var reader = new FileReader();

          //文件装载后将其显示在图片预览里
          reader.onload = function() {
            // $("#img_preview").attr("src", this.result);
            var bf = this.result;
            var blob = new Blob([bf], { type: "text/plain" });

            var urlBlob = URL.createObjectURL(blob);
            callback && callback(urlBlob);
          };

          //装载文件
          reader.readAsArrayBuffer(data.originalFiles[index]);
        }

        var index = data.index,
          file = data.files[index],
          node = $(data.context.children()[index]);

        if (file.preview) {
          //报错
          if (file.error) {
            node
              .append("<br>")
              .append($('<span class="text-danger"/>').text(file.error));
          }
          //上传按钮设置
          if (index + 1 === data.files.length) {
            data.context
              .find("button")
              .text("Upload")
              .prop("disabled", !!data.files.error);
          }

          function callback(urlBlob) {
            //设置裁剪图的数据
            that.cropperUrl = urlBlob

            that.$nextTick(() => {
              //初始化裁剪插件
              that.$refs.corpper.cropperCreate();
            });
          }

//file.preview
          function callback1(urlBlob){
              //创建预览图
              node.prepend("<br>").append($('<img/>')).find('img').attr({'src':urlBlob}).css("max-width","100px")
          }

          toBlob(data.originalFiles[index], callback);

          toBlob(data.originalFiles[index], callback1);

          

          
        }
      })
      .on("fileuploadprogressall", function(e, data) {
        var progress = parseInt((data.loaded / data.total) * 100, 10);
        $("#progress .progress-bar").css("width", progress + "%");
      })
      .on("fileuploaddone", function(e, data) {
        $.each(data.result.files, function(index, file) {
          if (file.url) {
            var link = $("<a>")
              .attr("target", "_blank")
              .prop("href", file.url);
            $(data.context.children()[index]).wrap(link);
          } else if (file.error) {
            var error = $('<span class="text-danger"/>').text(file.error);
            $(data.context.children()[index])
              .append("<br>")
              .append(error);
          }
        });
      })
      .on("fileuploadfail", function(e, data) {
        $.each(data.files, function(index) {
          var error = $('<span class="text-danger"/>').text(
            "File upload failed."
          );
          $(data.context.children()[index])
            .append("<br>")
            .append(error);
        });
      })
      .prop("disabled", !$.support.fileInput)
      .parent()
      .addClass($.support.fileInput ? undefined : "disabled");
  },
  data() {
    return {
      cropperUrl: "",
      action: "http://192.168.1.109:3001/api/v1/upload",
      isUploading: true
    };
  },
  methods: {
    upload() {
      this.isUploading = true;
      this.$refs.upload.start();
    },
    pause() {
      this.isUploading = false;
      this.$refs.upload.pause();
    },
    retry() {
      this.$refs.upload.retry();
    },
    filesAdded(files) {
      console.log("1");
      let hasIgnore = false;
      const maxSize = 1 * 1024 * 1024; // 1M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore &&
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "You selected >1M files"
        }).show();
    },
    fileSubmitted(files) {
      console.log(files);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/variables.less");

.wrap {
  .mixin-class-scrollWrapNotBottom;
  overflow: hidden;
}

.fileinput-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}

.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

input[type="file"] {
  display: block;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.fileinput-button input {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: "alpha(opacity=0)";
  font-size: 200px !important;
  direction: ltr;
  cursor: pointer;
}

.progress {
  height: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar-success {
  background-color: #5cb85c;
}

.progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
</style>

