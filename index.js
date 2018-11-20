window.onload = function(){
	data();
}

const access_token = '?access_token=' + 'b3d3a5f9f1228d360c47b6b13fa4dc6c2cbbece1';

let data = () => {
    fetch(`https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions`).then( x => { 
   			return x.json();
		}).then( data => {
			console.log(data);
		}).catch(function(err) {  
    		console.log('Fetch Error :', err); 
  		});
}

//https://api.github.com/repos/kottans/frontend-2019-homeworks/contents/submissions/KurosavaAkira?ref=master