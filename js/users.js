var users = '';

$.ajax({
         type:'GET',
         url:'http://localhost:8033/getusers',
		 async:false,
         dataType: 'text',
      }).success(function (data){
		 users = JSON.parse(data);
				 	
      })
