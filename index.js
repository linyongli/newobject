//封装过的代码
/*
 author： 准备资源
*/
(function() {

	//prepare
	function prepare() {

		const imgTask = (img, src) =>  {
			return new Promise(function(resolve,reject)  {
				img.onload =  resolve;
				img.onerror = reject;
				img.src = src;
			})
		}
		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg')
		])

		return {
			/*
			 * @param {Function} [callback]  -当准备好了之后要调用的回调函数
			 */
			getResource(callback) {
				allresourceTask.then(function() {
					callback && callback(context, heroImg, allSpriteImg)
				})
		
			}
		}
	}

	//draw
	function drawHero(context, heroImg,allSpriteImg){
		var draw = function() {
			this.context
			.drawImage(
				this.img,
				this.imgPos.x,
				this.imgPos.y,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x + 50,
				this.rect.y,
				this.rect.width,
				this.rect.height
			)
		}

		function Hero() {
			this.img = heroImg;
			this.context = context;
			this.imgPos = {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			};

			this.rect = {
				x: 0,
				y: 0,
				width: 45,
				height: 45,
			}
		}
		
		Hero.prototype.draw =  draw;

		function Monster(initPos) {
			this.img = allSpriteImg;
			this.context = context;
			this.imgPos = {
				x: 859,
				y: 529,
				width: 32,
				height: 32
			};

			this.rect = {
				x: initPos.x,
				y: initPos.y,
				width: 45,
				height: 45,
			}
		}

		Monster.prototype.draw = draw;

		function RedMonster(initPos)  {
			Monster.call(this, initPos);
			this.imgPos = {
				x: 859,
				y: 499,
				width: 32,
				height: 32
			};
			this.rect = {
				x: initPos.x,
				y: initPos.y,
				width: 65,
				height: 65,
			}
		}

		RedMonster.prototype = Object.create(Monster.prototype);

		var monster = new Monster({x:100,y:100});
		var monster2 = new RedMonster({x:200,y:200});

		var hero = new Hero();
		console.log('res::::')
		hero.draw();
		monster.draw();
		monster2.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function(context, heroImg,allSpriteImg) {
		drawHero(context, heroImg,allSpriteImg)
	});

})()