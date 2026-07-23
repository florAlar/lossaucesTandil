/*	gallery */
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            $('.filter').show('1000');
        }
        else
        {
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }

	        	if ($(".filter-button").removeClass("active")) {
			$(this).removeClass("active");
		    }
		    	$(this).addClass("active");
	    	});
});
/*	end gallery */

$(document).ready(function(){
    $(".fancybox").fancybox({
        arrows: true,
        animationEffect: "fade",
        transitionEffect: "slide",
        
        // Inyectar botones personalizados en el modal
        on: {
            reveal: function(instance, slide) {
                // Esperar a que el DOM esté listo
                setTimeout(function() {
                    var $container = instance.$refs.container;
                    
                    // Verificar si ya existen los botones (evitar duplicados)
                    if ($container.find('.fancybox-custom-nav').length > 0) {
                        return;
                    }
                    
                    // Crear contenedor de navegación personalizada
                    var navHTML = '<div class="fancybox-custom-nav">' +
                        '<button class="fancybox-nav-btn fancybox-nav-prev" title="Imagen anterior (← Anterior)">' +
                        '<i class="bi bi-chevron-left"></i>' +
                        '</button>' +
                        '<div class="fancybox-counter">' +
                        '<span class="counter-text"></span>' +
                        '</div>' +
                        '<button class="fancybox-nav-btn fancybox-nav-next" title="Siguiente imagen (Siguiente →)">' +
                        '<i class="bi bi-chevron-right"></i>' +
                        '</button>' +
                        '</div>';
                    
                    // Inyectar en el DOM
                    $container.find('.fancybox-infobar').after(navHTML);
                    
                    // Actualizar contador
                    updateCounter(instance);
                    
                    // Manejadores de eventos para botones
                    $container.find('.fancybox-nav-prev').on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        instance.prevSlide();
                        updateCounter(instance);
                    });
                    
                    $container.find('.fancybox-nav-next').on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        instance.nextSlide();
                        updateCounter(instance);
                    });
                    
                    // Teclas de teclado
                    $(document).on('keydown.fancybox-custom', function(e) {
                        if (!instance.isAnimating) {
                            if (e.keyCode === 37) { // Flecha izquierda
                                instance.prevSlide();
                                updateCounter(instance);
                            } else if (e.keyCode === 39) { // Flecha derecha
                                instance.nextSlide();
                                updateCounter(instance);
                            }
                        }
                    });
                }, 100);
            },
            destroy: function(instance) {
                // Limpiar event handlers
                $(document).off('keydown.fancybox-custom');
            }
        }
    });
    
    // Función para actualizar el contador
    function updateCounter(instance) {
        if (!instance) return;
        
        var slides = instance.slides || [];
        var currentIndex = instance.currIndex || 0;
        var total = slides.length;
        
        // Actualizar texto del contador
        var $counter = $('.fancybox-counter .counter-text');
        if ($counter.length) {
            $counter.text((currentIndex + 1) + ' / ' + total);
        }
        
        // Deshabilitar botones prev/next si es necesario (opcional)
        var $prevBtn = $('.fancybox-nav-prev');
        var $nextBtn = $('.fancybox-nav-next');
        
        // Si solo hay una imagen, deshabilitar botones
        if (total <= 1) {
            $prevBtn.add($nextBtn).prop('disabled', true).css('opacity', '0.5');
        }
    }
});
   
  