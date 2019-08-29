"use strict";



// init slick slider
$(function(){
	$(".banner-slider").slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true
	});
	
	$("#phone").inputmask({"mask": "+7 (999) 999-99-99"});
});

$(function() {
	var box = $('.top-menu');
	var button = $('.toggle-menu');
	button.on('click', function(){
		box.toggleClass('active');
	});
});




// load and delete file input type=file
$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
	var fileIdCounter = 0;

	this.closest(".files").change(function (evt) {
		var output = [];

		for (var i = 0; i < evt.target.files.length; i++) {
			fileIdCounter++;
			var file = evt.target.files[i];
			var fileId = sectionIdentifier + fileIdCounter;

			filesToUpload.push({
				id: fileId,
				file: file
			});

			var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + fileId + "\"></a>";

			output.push("<li>", escape(file.name), removeLink, "</li> ");
		};

		$(this).children(".fileList")
			.append(output.join(""));

		//reset the input to null - nice little chrome bug!
		evt.target.value = null;
	});

	$(this).on("click", ".removeFile", function (e) {
		e.preventDefault();

		var fileId = $(this).parent().children("a").data("fileid");

		// loop through the files array and check if the name of that file matches FileName
		// and get the index of the match
		for (var i = 0; i < filesToUpload.length; ++i) {
			if (filesToUpload[i].id === fileId)
				filesToUpload.splice(i, 1);
		}

		$(this).parent().remove();
	});

	this.clear = function () {
		for (var i = 0; i < filesToUpload.length; ++i) {
			if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
				filesToUpload.splice(i, 1);
		}

		$(this).children(".fileList").empty();
	}

	return this;
};

(function () {
	var filesToUpload = [];
	var filesUploader = $(".files").fileUploader(filesToUpload, "files");

	$("#uploadBtn").click(function (e) {
		e.preventDefault();

		var formData = new FormData();

		for (var i = 0, len = filesToUpload.length; i < len; i++) {
			formData.append("files", filesToUpload[i].file);
		}

		$.ajax({
			url: "http://requestb.in/1k0dxvs1",
			data: formData,
			processData: false,
			contentType: false,
			type: "POST",
			success: function (data) {
				alert("DONE");
				filesUploader.clear();
			},
			error: function (data) {
				alert("ERROR - " + data.responseText);
			}
		});
	});
})()



// init Isotope

$(function(){
	
	var $container = $('.catalog-container'),
			$checkboxes = $('.catalog-filters input');
	
	$container.isotope({
		itemSelector: '.catalog-item',
		percentPosition: true,
		masonry: {
			column: '.grid-sizer',
			gutter: '.gutter-sizer'
		}
	});
	
	$checkboxes.change(function(){
		var filters = [];
		$checkboxes.filter(':checked').each(function(){
			filters.push( this.value );
		});
		filters = filters.join(', ');
		$container.isotope({ filter: filters });
	});
		
});


// input value from catalog item to form ------------------------------

$(".catalog-item_bye").click(function(e) {
  var title = $(this).prev().find("h3").text();
  var price = $(this).prev().find(".price_int").text();
  var priceCoins = $(this).prev().find(".price_frac").text();
  var backetImg = $(this).prev().prev().find("img").attr("src");
  $(".backet_title").html(title);
  $(".backet_price .price_int").html(price);
  $(".backet_price .price_frac").html(priceCoins);
  $(".backet_img img").attr("src", backetImg);
});


document.addEventListener('touchstart', onTouchStart, {passive: true});