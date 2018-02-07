// додавання завдань на сторінку з файлу json
$.ajax({
    type: 'GET',
    url: 'data/task.json',
    dataType: 'json',
    success: successCallback,
    error : function(error){
    	console.log(error)
    }
});

function successCallback(data){
	for (var i = 0; i < data.length; i++) {
		renderTasks(data[i]);
	}

}

// адаптивне меню
$(".menu_btn").click(function() {
    if ($(".wrapper_tabs").is(":visible")) {
		$(".wrapper_tabs").fadeOut(600);
	} else {
		$(".wrapper_tabs").fadeIn(600);
		$(".wrapper_tabs .tab").addClass("fadeInUp animated");
	};
});

$('.tab').click(function(){
	if ($('.menu_btn').is(':visible')) {
		$(".wrapper_tabs").fadeOut(600);
	}
})