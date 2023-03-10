status_data={
	num_blocks:0,
	block_run:0
}


var editors={}

toggle_editor=function(i){
	if(get_dom("cell_type"+i).checked) return;
	
	{
		input_dom=get_dom("input"+i)
		input_dom.style.display = "block";
		get_dom("cell_menu"+i).style.display = "block";
		get_dom("result"+i).style.display = "none";
		cm=input_dom.childNodes[0].CodeMirror;
		cm.focus();
		cm.setCursor(1,0)
		
	}
}
unfocus_editor=function(i){
	if(get_dom("cell_type"+i).checked) return;
	{
		input_dom=get_dom("input"+i)
		input_dom.style.display = "none";
		//get_dom("cell_menu"+i).style.display = "none";
		get_dom("result"+i).style.display = "block";
		
	}
}
delete_cell=function(i){
	get_dom("block"+i).remove();
	delete editors[i];
}
move_up=function(i){
	curr=get_dom("block"+i)
	prev=curr.previousSibling
	curr.parentNode.insertBefore(curr,prev);
	
	input_dom=get_dom("input"+i)
	cm=input_dom.childNodes[0].CodeMirror;
	cm.focus();
	cm.setCursor(1,0)
}
move_down=function(i){
	curr=get_dom("block"+i)
	next=curr.nextSibling
	curr.parentNode.insertBefore(curr, next.nextSibling)
	
	input_dom=get_dom("input"+i)
	cm=input_dom.childNodes[0].CodeMirror;
	cm.focus();
	cm.setCursor(1,0)
}

goto_next_cell=function(i){
	curr=get_dom("block"+i);
	next=curr.nextSibling;
	if(next==null) return;
	next_block_id=next.id.replace("block","");
	goto_input_cell(next_block_id);
	
}
goto_input_cell=function(i){
	if(!get_dom("cell_type"+i).checked){
		input_dom=get_dom("input"+i)
		input_dom.style.display = "block";
		get_dom("cell_menu"+i).style.display = "block";
		get_dom("result"+i).style.display = "none";
		cm=input_dom.childNodes[0].CodeMirror;
		cm.focus();
		cm.setCursor(1,0)
		
	}else{
		input_dom=get_dom("input"+i)
		cm=input_dom.childNodes[0].CodeMirror;
		cm.focus();
		cm.setCursor(1,0)
	}
}
insert_cell=function(type,after){
	var i=status_data.num_blocks;
	var block_html=get_dom("code_block_template").innerHTML;
	block_html=block_html.replaceAll('_block_id',i);
	block_html= block_html.replaceAll(/(\r\n|\n|\r|\t)/gm, "");

	var div = document.createElement('div');
  	div.innerHTML = block_html; 
  	div.setAttribute('id','block'+i);

  	//
  	if(after==undefined){
  		get_dom("main").appendChild(div);
  		
  	}else{
  		get_dom("block"+after).after(div)
  	}

	waitForDom("input"+i).then(input_div => {
	
		cm = new CodeMirror(function(node){input_div.appendChild(node);
		}, {
		  value: "",
		   tabSize: 4,
			     mode: 'javascript',
			     theme: 'default',
			     lineNumbers: true,
			     //styleActiveSelected: true,
			     //styleActiveLine: true,
			     indentWithTabs: true,
			     matchBrackets: true,
			     highlightMatches: true,
			     extraKeys: {
			          'Ctrl-Enter': (cm) => { run(i)},
			          'Cmd-Enter': (cm) => {run(i)},
			          'Shift-Enter': (cm) => {run(i);goto_next_cell(i) },
			          'Alt-Enter': (cm) => {insert_cell('code',i);},
			           //'Alt-R':(cm)=>{run_all()},	
			           'Alt-D':(cm)=>{delete_cell(i)},	
			           'Alt-Up':(cm)=>{move_up(i)},	
			           'Alt-Down':(cm)=>{move_down(i)},		     
			          }
		});
		
		
		if(type=='code'){
  			get_dom('cell_type'+i).checked=true;
	  	}
	  	else{
	  		console.log(i,type);
	  		get_dom('cell_type'+i).checked=false;
	  		get_dom('result'+i).style.display='block';
	  		get_dom('input'+i).style.display='none';
	  		get_dom('status'+i).style.display='none';
	  		get_dom("cell_menu"+i).style.display = "none";
	  	}
	  	cm.focus();
		cm.setCursor(1,0);
	  	editors[i]=cm;

	});
	

	status_data.num_blocks=i+1;

}






toggle_dark_mode=function(){
   if(document.body.getAttribute("data-theme")=='light')
   document.body.setAttribute("data-theme",'dark');
   else document.body.setAttribute("data-theme",'light');
}

get_nb=function(){
	var nb=JSON.parse(JSON.stringify(blank_nb));
 	nb.metadata.name=get_dom("nb_name").innerHTML;
 	
 	var main=get_dom("main");
 	var blocks=main.childNodes;
 	
 	
 	blocks.forEach(x=>{
 		var _block_id=x.id.replace("block","")
 		var menu=x.childNodes[0];
	 	var code=x.childNodes[1].childNodes[0].CodeMirror.getValue();
	 	var result=x.childNodes[2];
	 	var status=result.childNodes[0].innerHTML;
	 	var output=result.childNodes[1].innerHTML;
	 	var type=get_dom("cell_type"+_block_id).checked?'code':'html';
	 	nb.cells.push({code:code,status:status,output:output,type:type})
	 	
 	});
 	return nb;
	
}


get_js=function(){
	var nb=[]
 	
 	var main=get_dom("main");
 	var blocks=main.childNodes;
 	
 	
 	blocks.forEach(x=>{
 		var menu=x.childNodes[0];
	 	var code=x.childNodes[1].childNodes[0].CodeMirror.getValue();
	 	var result=x.childNodes[2];
	 	var status=result.childNodes[0].innerHTML;
	 	var output=result.childNodes[1].innerHTML;
	 	var type=menu.childNodes[0].checked?'code':'html';
	 	if (type=='code')
	 	nb.push(code)
	 	
 	});
 	return nb;
	
}


download_nb=function(){
 	
 	nb=get_nb();
 	downloadObjectAsJson(nb,nb.metadata.name+'.jsnb');	
 	
 	
}

download_js=function(){
 	
 	nb=get_js();
 	nb=nb.join("\n\n");
 	name=get_dom("nb_name").innerHTML+'.js';
 	nb="/*Generated by JSNB: https://github.com/gopi-suvanam/jsnb*/\n\n"+nb
	var dataStr = "data:text/js;charset=utf-8," + encodeURIComponent(nb); 	
 	    var downloadAnchorNode = document.createElement('a');
	    downloadAnchorNode.setAttribute("href",     dataStr);
	    downloadAnchorNode.setAttribute("download", name );
	    document.body.appendChild(downloadAnchorNode); // required for firefox
	    downloadAnchorNode.click();
	    downloadAnchorNode.remove();
}

load_jsnb=function(content){
	try{
		var nb=JSON.parse(content);
		get_dom("nb_name").innerHTML=nb.metadata.name;
		var main=get_dom("main");
		var bkup_html=main.innerHTML;
		var bkup_editors=editors
		var bkup_status_data=status_data;
		status_data={
			num_blocks:0,
			block_run:0
		}
		editors={}
		main.innerHTML='';
		var i=0;
		nb.cells.forEach(x=>{
			insert_cell(x['type']);
			waitForDom("input"+i).then(input_div => {
				input_div.childNodes[0].CodeMirror.setValue(x['code'])
			});
			waitForDom("output"+i).then(output_div => {
				output_div.innerHTML=x['output'];
			});
			waitForDom("status"+i).then(status_div => {
				status_div.innerHTML=x['status'];
			});
			
			i=i+1;
			
			
		});
	}catch(err){
		alert(err.message)
		console.log(err.stack)
		editors=bkup_editors
		main.innerHTML=bkup_html;
		alert(err.message)
	}
	status_data.num_blocks=i;

}

download_html=function(only_output){
 	var name=get_dom("nb_name").innerHTML;
 	
 	var main=get_dom("main");
 	var blocks=main.childNodes;
	var html='<html><head>'
	
	var css= [];

	for (var sheeti= 0; sheeti<document.styleSheets.length; sheeti++) {
		html+="<link rel='stylesheet' href='"+document.styleSheets[sheeti].href+"'>"
	}
		
	html+='<title>_title:JavaScript Notebook</title></head><body><nav><ul><li><a>_title</a></li></ul></nav><br>'; 	
	html=html.replaceAll("_title",name)
 	blocks.forEach(x=>{
	 	var result=x.childNodes[2];
	 	var output=result.outerHTML;
	 	var input ='';
	 	if(!only_output) input=x.childNodes[1].outerHTML;
	 	
	 	
	 	html=html+input+output;
	 	
 	});
 	html=html+"</body></html>"
 	console.log(html)
 	downloadStringAsHTML(html,name+'.html');	
}


insitialize_page=function(){

	try{ url=window.location.href.split("#")[1];} catch(e){url=''}
  	if(url!=undefined && url.length>1){
  		if(url.split(":")[0].trim()=='github') initialize_from_git(url.split(":")[1].trim());
  		else read_file(url,load_jsnb,err=>{alert(err.message)});
  	}
  	else insert_cell('code');
  	
  	const file_loader = document.getElementById("upload_file");
  	
	
	load_file_click=function(){
	  if (file_loader) {
	    file_loader.click();
	  }
	};


  	
  	file_loader.addEventListener("change", handleFiles, false);
  	
  	document.onkeyup = function(e) {
	  if (e.ctrlKey && e.key === 's') {
	    download_nb();
	  } else if (e.ctrlKey && e.key === 'g') {
	    openModal(get_dom('git-import-export'));
	  } else if (e.ctrlKey && e.key === 'o') {
	    load_file_click()
			
	  }
	  else if (e.altKey && e.key === '®') {
	    run_all()
			
	  }
	  else if (e.altKey && e.key === 'r') {
	    run_all()
			
	  }
	};
	  	
}

