console.log("document been read");
 function Video_Interactivity_Timestamp(...args){
    console.log("Started")
    let enterTime = args[0];
    window._wq = window._wq || [];
			_wq.push({
			id: '{{Wistia_URL}}',
			onReady: function (video) {
				let timer = setInterval(() => {
					if (parseInt(video.time()) == parseInt(enterTime)) {
						video.pause();
						console.log("stopped");
						clearInterval(timer);
					}
				}, 1000);
			},
			});		
  }
   function Add_Quiz(...args) {
			//   alert("calling function")
			const para = document.createElement("div");
			para.style.width = "100px";
			para.style.height = "100px";
			para.style.backgroundColor = "gray";
			document.getElementById("videoCol").appendChild(para);
			console.log(...args)
			let enterTime = args[0];
			console.log(args.slice(2))
			let milliSec = enterTime * 1000;
			window._wq = window._wq || [];
			_wq.push({
			id: '{{Wistia_URL}}',
			onReady: function (video) {
				let timer = setInterval(() => {
					if (parseInt(video.time()) == parseInt(enterTime)) {
						video.pause();
						console.log("stopped");
						clearInterval(timer);
					}
				}, 1000);
			},
			});			

  		}
