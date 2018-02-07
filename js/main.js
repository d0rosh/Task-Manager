function getQ(a){
	return document.querySelector(a);
}
function createElem(a){
	return document.createElement(a);
}

var newTask = getQ('.new_task');
var progressTask = getQ('.progress_task');
var completedTask = getQ('.completed_task');
var removedTask = getQ('.removed_task');
var addBtn = getQ('.add_btn');
var authorField = getQ('.name_author');
var taskField = getQ('.name_task');
var descrpField = getQ('.description_task');
var listField = [authorField, taskField, descrpField];
var newTasksList = [];
var progressTasksList = [];
var completedTasksList = [];
var removedTasksList = [];
var statusList = ['new', 'in progress', 'completed'];
var newCount = 0;
var progressCount = 0;
var completedCount = 0;
var removedCount = 0;
var new_field = getQ('.n_count');
var progress_field = getQ('.p_count');
var completed_field = getQ('.c_count');
var removed_field = getQ('.r_count');
var id = 3;


// рендеринг завдань
function renderTasks(data){
	var item = createElem('div');
	item.className = 'task_block ';

	if (data.img) {
		var img = createElem('img');
		img.src = data.img;
		item.appendChild(img);
	}

	var name = createElem('p');
	name.innerHTML = 'Author: ' + '<span>' + data.name + '</span>';

	var task_name = createElem('h4');
	task_name.innerHTML = data.task_name;

	var description = createElem('p');
	description.innerHTML = data.description;

	item.appendChild(name);
	item.appendChild(task_name);
	item.appendChild(description);

	if (data.status != 'delete') {
		var wrap_select = createElem('div');
		wrap_select.className = 'wrap_select';
		var select = createElem('select');
		for (var k = 0; k < statusList.length; k++) {
			var select_option = createElem('option');
			select_option.value = statusList[k];
			select_option.innerHTML = statusList[k];
			if (data.status == statusList[k]) {
				select_option.selected = true;
			}
			select.appendChild(select_option);
			wrap_select.appendChild(select);
			item.appendChild(wrap_select);
		}
		select.onchange = changeStatus(data, select);
	}

	var form = createElem('form');
	form.className = 'form_file';
	var label = createElem('label');
	label.innerHTML = 'Choose';
	if (data.label_text) {
		label.innerHTML = data.label_text;
	}
	label.className = 'input_label';
	var input_field = createElem('input');
	input_field.type = 'file';
	input_field.className = 'image_field';
	var input_id = input_field.id = 'photo' + data.id;
	label.setAttribute("for", input_id);
	input_field.onclick = addImg(data,input_field)

	form.appendChild(label);
	form.appendChild(input_field);
	item.appendChild(form);

	var delete_btn = createElem('button');
	delete_btn.className = 'delete_task';
	delete_btn.innerHTML = 'Delete';
	item.appendChild(delete_btn);
	delete_btn.onclick = deleteTask(data);

	if (data.status == 'new') {
		newTask.appendChild(item);
		newTasksList.push(data);
		newCount++;
		new_field.innerHTML = newCount;
	}else if (data.status == 'in progress') {
		progressTask.appendChild(item);
		progressTasksList.push(data);
		progressCount++;
		progress_field.innerHTML = progressCount;
	}else if (data.status == 'completed') {
		completedTask.appendChild(item);
		completedTasksList.push(data);
		completedCount++;
		completed_field.innerHTML = completedCount;
	}else if(data.status == 'delete'){
		var restore_btn = createElem('button');
		restore_btn.className = 'restore_task';
		restore_btn.innerHTML = 'Restore';
		item.appendChild(restore_btn);
		restore_btn.onclick = restoreTask(data);
		removedTask.appendChild(item);
		removedTasksList.push(data);
		removedCount++;
		removed_field.innerHTML = removedCount;
	}


}

// відновлення завдання
function restoreTask(data){
	return function(){
		var itemIndex = removedTasksList.findIndex(e=>e.name==data.name);
		removedTasksList.splice(itemIndex,1);
		removedTask.removeChild(removedTask.children[itemIndex]);
		data.status = data.prev_status;
		renderTasks(data);
		removedCount--;
		removed_field.innerHTML = removedCount;
	}
}

// видалення завдання
function deleteTask(data){
	return function(){
		if (data.status == 'new') {
			var itemIndex = newTasksList.findIndex(e=>e.name==data.name);
			newTasksList.splice(itemIndex,1);
			newTask.removeChild(newTask.children[itemIndex]);
			newCount--;
			new_field.innerHTML = newCount;
		}else if(data.status == 'in progress'){
			var itemIndex = progressTasksList.findIndex(e=>e.name==data.name);
			progressTasksList.splice(itemIndex,1);
			progressTask.removeChild(progressTask.children[itemIndex]);
			progressCount--;
			progress_field.innerHTML = progressCount;
		}else if (data.status == 'completed') {
			var itemIndex = completedTasksList.findIndex(e=>e.name==data.name);
			completedTasksList.splice(itemIndex,1);
			completedTask.removeChild(completedTask.children[itemIndex]);
			completedCount--;
			completed_field.innerHTML = completedCount;
		}else if(data.status == 'delete'){
			var itemIndex = removedTasksList.findIndex(e=>e.name==data.name);
			removedTasksList.splice(itemIndex,1);
			removedTask.removeChild(removedTask.children[itemIndex]);
			removedCount--;
			removed_field.innerHTML = removedCount;
			return;
		}
		data.prev_status = data.status;
		data.status = 'delete';
		renderTasks(data);

	}
}

// переміщення завдань
function changeStatus(data,status){
	return function(){
		var index = status.options.selectedIndex;
		if (data.status == 'new') {
			data.status = status.children[index].value;
			var itemIndex = newTasksList.findIndex(e=>e.name==data.name);
			newTasksList.splice(itemIndex,1);
			newTask.removeChild(newTask.children[itemIndex]);
			newCount--;
			new_field.innerHTML = newCount;
		}else if(data.status == 'in progress'){
			data.status = status.children[index].value;
			var itemIndex = progressTasksList.findIndex(e=>e.name==data.name);
			progressTasksList.splice(itemIndex,1);
			progressTask.removeChild(progressTask.children[itemIndex]);
			progressCount--;
			progress_field.innerHTML = progressCount;
		}else if (data.status == 'completed') {
			data.status = status.children[index].value;
			var itemIndex = completedTasksList.findIndex(e=>e.name==data.name);
			completedTasksList.splice(itemIndex,1);
			completedTask.removeChild(completedTask.children[itemIndex]);
			completedCount--;
			completed_field.innerHTML = completedCount;
		}
		renderTasks(data);
	}
}

// добавлення фото до завдання
function addImg(data,input){
	return function(){
		input.onchange = function(event){
			var selectedFile = event.target.files[0];

			var reader = new FileReader();

			var img = document.createElement('img');
			
			reader.onload = function(event) {
				data.img = event.target.result;
			    img.src = event.target.result;
			};
			

			var urlImg = selectedFile.name;
			if (urlImg.length > 20) {
				var urlImg = urlImg.split('');
				urlImg.length = 20;
				urlImg = urlImg.join('');
				urlImg += '...';
			}
			data.label_text = urlImg;
			input.previousElementSibling.innerHTML = urlImg;

			var inputWrap = input.parentNode.parentNode;
		    reader.readAsDataURL(selectedFile);
		   	if (inputWrap.children[0].tagName != 'IMG') {
		   		inputWrap.insertBefore(img,inputWrap.firstChild);
		   	}else {
		   		inputWrap.removeChild(inputWrap.children[0]);
		   		inputWrap.insertBefore(img,inputWrap.firstChild);
		   	}
		    
		}
	}
}

// додавання нового завдання
addBtn.onclick = function(event){
	event.preventDefault();
	if (validateForm()) {
		var data = {
			id: ++id,
			name: authorField.value,
			task_name: taskField.value,
			description: descrpField.value,
			status: 'new'
		}

		renderTasks(data);
		authorField.value = '';
		taskField.value = '';
		descrpField.value = '';	
		popap_form.style.display = 'none';
	}
}


// валідація форми
function validateForm(){
	var countErrors = 0;
	for (var i = 0; i < listField.length; i++) {
		if(listField[i].value == ''){
			countErrors += 1;
			listField[i].style.borderColor = 'red';
		}else {
			listField[i].style.borderColor = 'black';
		}
	}

	if(countErrors > 0) {
		return false;
	}
	return true;
}

// попап з формою додавання завдань
var btn_plus_task = getQ('.btn_plus_task');
var popap_form = getQ('.popap_form');
var exit_popap = getQ('.exit_popap')
btn_plus_task.onclick = function(){
	popap_form.style.display = 'block';
}

exit_popap.onclick = function(){
	popap_form.style.display = 'none';
}

// таби
var tabs = document.querySelectorAll('.tab');
var content_tabs = document.querySelectorAll('.content_tabs');

for (var i = 0; i < tabs.length; i++) {
	tabs[i].onclick = activeTab(i);
}

function activeTab(index){
	return function(){
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].id = '';
			content_tabs[i].id = '';
		}
		tabs[index].id = 'is_active';
		content_tabs[index].id = 'is_block';
	}
}


