(function($){
    $.snowfall = function(element, options){
        var    defaults = {
                flakeCount : 35,
                flakeColor : '#ffffff',
                flakeIndex: 999999,
                minSize : 1,
                maxSize : 3,
                minSpeed : 2,
                maxSpeed : 3,
                round : false,
                shadow : false
            },
            options = $.extend(defaults, options),
            random = function random(min, max){
                return Math.round(min + Math.random()*(max-min));
            };

            $(element).data("snowfall", this);

            function Flake(_x, _y, _size, _speed, _id)
            {
                this.id = _id;
                this.x  = _x;
                this.y  = _y;
                this.size = _size;
                this.speed = _speed;
                this.step = 0,
                this.stepSize = random(1,10) / 100;

                var flakeMarkup = $(document.createElement("div")).attr({'class': 'snowflake', 'id' : 'flake-' + this.id}).css({'width' : this.size, 'height' : this.size, 'background' : options.flakeColor, 'position' : 'absolute', 'top' : this.y, 'left' : this.x, 'fontSize' : 0, 'zIndex' : options.flakeIndex});

                if($(element).get(0).tagName === $(document).get(0).tagName){
                    $('body').append(flakeMarkup);
                    element = $('body');
                }else{
                    $(element).append(flakeMarkup);
                }

                this.element = document.getElementById('flake-' + this.id);

                this.update = function(){
                    this.y += this.speed;

                    if(this.y > (elHeight) - (this.size  + 6)){
                        this.reset();
                    }

                    this.element.style.top = this.y + 'px';
                    this.element.style.left = this.x + 'px';

                    this.step += this.stepSize;
                    this.x += Math.cos(this.step);

                    if(this.x > (elWidth) - widthOffset || this.x < widthOffset){
                        this.reset();
                    }
                }

                this.reset = function(){
                    this.y = 0;
                    this.x = random(widthOffset, elWidth - widthOffset);
                    this.stepSize = random(1,10) / 100;
                    this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
                    this.speed = random(options.minSpeed, options.maxSpeed);
                }
            }

            var flakes = [],
                flakeId = 0,
                i = 0,
                elHeight = $(element).height(),
                elWidth = $(element).width(),
                widthOffset = 0,
                snowTimeout = 0;

            if($(element).get(0).tagName === $(document).get(0).tagName){
                widthOffset = 25;
            }

            $(window).bind("resize", function(){
                elHeight = $(element).height();
                elWidth = $(element).width();
            });

            for(i = 0; i < options.flakeCount; i+=1){
                flakeId = flakes.length;
                flakes.push(new Flake(random(widthOffset,elWidth - widthOffset), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed), flakeId));
            }

            if(options.round){
                $('.snowflake').css({'-moz-border-radius' : options.maxSize, '-webkit-border-radius' : options.maxSize, 'border-radius' : options.maxSize});
            }

            if(options.shadow){
                $('.snowflake').css({'-moz-box-shadow' : '1px 1px 1px rgba(0,0,0,.125)', '-webkit-box-shadow' : '1px 1px 1px rgba(0,0,0,.125)', 'box-shadow' : '1px 1px 1px rgba(0,0,0,.125)'});
            }

            function snow(){
                for( i = 0; i < flakes.length; i += 1){
                    flakes[i].update();
                }

                snowTimeout = setTimeout(function(){snow()}, 30);
            }

            snow();


        this.clear = function(){
            $(element).children('.snowflake').remove();
            flakes = [];
            clearTimeout(snowTimeout);
        };
    };

    $.fn.snowfall = function(options){
        if(typeof(options) == "object" || options == undefined){
                 return this.each(function(i){
                    (new $.snowfall(this, options));
                });
        }else if (typeof(options) == "string") {
            return this.each(function(i){
                var snow = $(this).data('snowfall');
                if(snow){
                    snow.clear();
                }
            });
        }
    };
})(jQuery);

$(document).ready(function(){
    $(document).snowfall( { shadow:true, round:true, minSize:1, maxSize:9, flakeCount:100 } );
});
