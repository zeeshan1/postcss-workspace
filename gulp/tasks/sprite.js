var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del'),
	config = {
		mode: {
			css: {
				sprite: 'sprite.svg', // if you want to change the name of the sprite file's path
				render: {
					css: {
						template: './gulp/templates/sprite.css'
					}
				}
			}
		}
	};

	// lets delete the old sprite before create new one

gulp.task('beginClean', function(){
	return del(['./app/temp/sprite', './app/assets/images/sprite'])
})

	//create and place sprite file in temp folder
	
gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))		
		.pipe(gulp.dest('./app/temp/sprite/'));
})

	// now move the sprive svg file into the relevant folder

gulp.task('copySpriteGraphic', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprite'))
})

	// rename and copy sprite file in css modules folder 

gulp.task('copySpriteCSS', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'))
})

	// after creating sprite folder and after all the copy/pasting css file
	// and graphic file now goint to delete temp sprite folder 

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
})

	// create in temp, copy from temp to styles/modules and rename the sprite file with a single task

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'])