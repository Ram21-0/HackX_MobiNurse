$(()=>{
    console.log('Welcome to Patient Side');
    setTimeout(()=>{
        $(".loader-wrapper").fadeOut("slow");
    },5000)
    
    data()
        .then(function(){
            console.log("Data call completed")
            createList()
                .then(function(){
                    console.log("All done")
                })
        })
            
})
  
  
  let content={
    advice:[],
    disease:[],
    name:[],
    age:[],
    gender:[],
    medication:[],
    symptoms:[]
  }
  //------------------------CONTENT STORING ARRAY------------------------
  
  //------------------------DATA FUNCTION TO FETCH DATA FROM FIREBASE RDBMS------------------------
  
    function data()
    {
        return new Promise(function(resolve,reject){
            console.log("Data is called")
            firebase.database().ref("python/isAvailable/advice").on("child_added",(snapshot,prevChildKey)=>{
                let Advice=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(Advice)
                content.advice.push({
                key : snapshot.key,
                value : Advice[0]
                })
            })
        
            firebase.database().ref("python/isAvailable/disease").on("child_added",(snapshot,prevChildKey)=>{
                let disease=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(disease[0]);
                content.disease.push({
                key : snapshot.key,
                value : disease[0]
                });
            })
        
            firebase.database().ref("python/isAvailable/medication").on("child_added",(snapshot,prevChildKey)=>{
                let med=snapshot.key
                console.log(snapshot.key+":")
                
                firebase.database().ref().child("python/isAvailable/medication/"+med).on("child_added",function(snap,prevKey){
                console.log(snap.key)
                let arr = [];
                firebase.database().ref().child("python/isAvailable/medication/"+med+"/"+snap.key).on("child_added",function(ss,prev){
                    console.log(ss.key)
                    console.log(ss.val()) 
                    arr.push({
                    key : ss.key,
                    value : ss.val()
                    })
                })
                content.medication.push({
                    key : snapshot.key,
                    value : snap.key,
                    sub_value : arr
                })
                })
                
            })
        
            firebase.database().ref("python/isAvailable/name").on("child_added",(snapshot,prevChildKey)=>{
                let name=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(name[0]);
                content.name.push({
                key : snapshot.key,
                value : name[0]
                });
            })
        
            firebase.database().ref("python/isAvailable/age").on("child_added",(snapshot,prevChildKey)=>{
                let age=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(age[0]);
                content.age.push({
                key : snapshot.key,
                value : age[0]
                })
            })
        
            firebase.database().ref("python/isAvailable/gender").on("child_added",(snapshot,prevChildKey)=>{
                let gender=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(gender[0]);
                content.gender.push({
                key : snapshot.key,
                value : gender[0]
                })
            
            })
        
            firebase.database().ref("python/isAvailable/symptoms").on("child_added",(snapshot,prevChildKey)=>{
                let symptoms=snapshot.val().split('\n')
                console.log(snapshot.key)
                console.log(symptoms[0]);
                content.symptoms.push({
                key : snapshot.key,
                value : symptoms[0]
                });
            })
        console.log('-------------------------------------\n');
        // console.log(content);
        // setTimeout(()=>{
        //   $('#mypdf').hide();
        //   createList();
        // },2500)
        $('#mypdf').hide()

        setTimeout(function(){
            resolve()
        },5000)
        
    })
      
  }
  
  function createList(){
      return new Promise(function(resolve,reject){
        console.log('CreateList called');
        //-------------------------------------NAME-------------------------------------
        let naam = content.name;
        for(let i=0;i<naam.length;i++){
            let y = naam[i].value;
            $('#mylist1').append(
                $('<li>')
                    .text(y)
                    .attr('class','list-group-item')
            )
            $('#l1').append(
                $('<li>').text('Name : ' + y)
            )
            $('#welcome').append('Welcome ' + y);
        }
        //-------------------------------------AGE-------------------------------------
        let age = content.age;
        for(let i=0;i<age.length;i++){
            let y = age[i].value;
            $('#mylist2').append(
                $('<li>').text(y).attr('class','list-group-item')
            )
            $('#l2').append(
                $('<li>').text('Age : ' + y)
            )
        }
        //-------------------------------------GENDER------------------------------------
        let gender = content.gender;
        for(let i=0;i<gender.length;i++){
            let y = gender[i].value;
            $('#mylist3').append(
                $('<li>').text(y).attr('class','list-group-item')
            )
            $('#l3').append(
                $('<li>').text('Gender : ' + y)
            )
        }
    
    
        //-------------------------------------SYMPTOMS------------------------------------
        let symp = content.symptoms;
        $('#l4').append($('<li>').text('Symptoms :'))
        for(let i=0;i<symp.length;i++)
        {
            let y = (i+1)+". " + symp[i].value+"\n";
            $('#mylist4').append(
                $('<li>').text(y).attr('class','list-group-item')
            )
            $('#l4').append(
                $('<li>').text(y)
            )
        }
    
    
        //-------------------------------------DISEASE------------------------------------
        let beemari = content.disease;
        for(let i=0;i<beemari.length;i++){
            let y =  (i+1) + ". " + beemari[i].value;
            $('#mylist5').append(
                $('<li>').text(y).attr('class','list-group-item')
            )
            $('#l5').append(
                $('<li>').text('Disease\n' + y)
            )
        }
    
    
        //-------------------------------------MEDICINES------------------------------------
        let dawai = content.medication;
        $('#l6').append($('<li>').text('\nMedicines-'));
        for(let i=0;i<dawai.length;i++){
            let t = "\n"+(i+1) + ". " + dawai[i].value ;
            $('#mylist6').append(
                $('<li>').text(t).attr('class','list-group-item list-group-item-success')
            )
            t+="\n"
            $('#l6').append(
                $('<li>').text("    "+t)
            )
            let q;
            for(let j=0;j<dawai[i].sub_value.length;j++){
                q = dawai[i].sub_value[j].key + ':' + dawai[i].sub_value[j].value;
                $("#mylist6").append(
                    $('<li>').text(q).attr('class','list-group-item').attr('class','offset-md-2')
                )
                $('#l6').append(
                    $('<li>').text("        "+q)
                )
            }
        }
    
    
        //-------------------------------------ADVISE------------------------------------
        let salaah = content.advice;
        $('#l7').append($('<li>').text('Advise-'))
        for(let i=0;i<salaah.length;i++){
            let y = (i+1) + ". " + salaah[i].value;
            $('#mylist7').append(
                $('<li>')
                    .text(y)
                    .attr('class','list-group-item')
            )
            $('#l7').append(
                $('<li>').text("    "+y+"\n")
            );
        }
        setTimeout(function(){
            resolve()
        },2000)
        
      })
    
  }
  
  function genpdf(){
    let obj=
    {
        txt:$('#l1').text()+"\n"+$('#l2').text()+"\n"+$('#l3').text()+"\n\n"+$("#l4").text().split(":")[0]+"\n"+$('#l4').text().split(":")[1]+"\n"+$('#l5').text()+"\n"+$('#l6').text().split("-")[0]+$('#l6').text().split("-")[1]+"\n\n"+$('#l7').text().split("-")[0]+"\n"+$('#l7').text().split("-")[1]
    }
    console.log("Generating PDF");
    // console.log(obj.txt)
      $.post('/genPDF',obj,(data)=>{
          if(data=="success")
          {
              alert("PDF has been generated successfully")
          }
          else
          {
              alert("Failed to generate PDF")
          }
      })
      
  }

function sendmail(){
    console.log('Send Mail button clicked');
    // let pdfText=$('#l1').text()+"\n"+$('#l2').text()+$('#l3').text()+"\n"+$('#l4').text()+"\n"+$('#l5').text()+"\n"+$('#l6').text()+"\n"+$('#l7').text()
    // let pdfText=$('#mypdf').html()
    // console.log(pdfText);
    let obj= {
        msg : $('#l1').text()+"\n"+$('#l2').text()+"\n"+$('#l3').text()+"\n\n"+$("#l4").text().split(":")[0]+"\n"+$('#l4').text().split(":")[1]+"\n"+$('#l5').text()+"\n"+$('#l6').text().split("-")[0]+$('#l6').text().split("-")[1]+"\n\n"+$('#l7').text().split("-")[0]+"\n"+$('#l7').text().split("-")[1]
    }
    $.post('/sendmail',obj,function(data){
       if(data=='Success'){
            console.log('Success!\nMail Sent');
            alert('Mail Sent');
       }
    })
}
  
  