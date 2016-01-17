var git = require('gulp-git'),
	build_number = process.env.BUILD_NUMBER;

global.gittag = 'master';

module.exports = function () {
	git.exec({args: 'branch -v'}, function (err, stdout) {
		var lines = stdout.split('\n'),
			line,
			words;

		for (line in lines) {
			if (lines.hasOwnProperty(line) && lines[line].startsWith("*")) {
				words = lines[line].split(/\s+/);
				global.gittag = words[1] + '-' + (build_number || words[2]);

				console.log('The git tag is %s', global.gittag);
				break;
			}
		}
	});
};