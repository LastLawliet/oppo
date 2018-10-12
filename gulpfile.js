var gulp = require("gulp");//require:相当于<script src="gulp.js"></script>

//定义一个复制文件的任务
//task函数的第一个参数：copyHtml是任务名
//task函数的第一个参数 function是任务 copyHtml对应的功能
gulp.task("copyall",function(){
	gulp.src("index.html").pipe(gulp.dest("D:\\Program Files (x86)\\phpStudy\\PHPTutorial\\WWW\\oppo"));
	gulp.src("css/**/*").pipe(gulp.dest("D:\\Program Files (x86)\\phpStudy\\PHPTutorial\\WWW\\oppo\\css"));
	gulp.src("js/**/*").pipe(gulp.dest("D:\\Program Files (x86)\\phpStudy\\PHPTutorial\\WWW\\oppo\\js"));
	gulp.src("img/**/*").pipe(gulp.dest("D:\\Program Files (x86)\\phpStudy\\PHPTutorial\\WWW\\oppo\\img"));
	gulp.src("font/**/*").pipe(gulp.dest("D:\\Program Files (x86)\\phpStudy\\PHPTutorial\\WWW\\oppo\\font"));
});

//监听
gulp.task("watchall",function(){
	gulp.watch("index.html",["copyall"]);
	gulp.watch("css/**/*",["copyall"]);
	gulp.watch("js/**/*",["copyall"]);
	gulp.watch("img/**/*",["copyall"]);
	gulp.watch("font/**/*",["copyall"]);
});