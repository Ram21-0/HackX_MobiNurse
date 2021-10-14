$(()=>{
  data();
})

//------------------------CONTENT STORING ARRAY------------------------
let content={
    advice:[],
    disease:[],
    name:[],
    age:[],
    gender:[],
    medication:[],
    symptoms:[]
  }

//------------------------DATA FUNCTION TO FETCH DATA FROM FIREBASE RDBMS------------------------

  function data(){
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
    setTimeout(()=>{
      createList();
    },2500)
    
}

//--------------------------------------List Creation--------------------------------------//
function createList(){
  console.log('CreateList called');
  let salaah = content.advice;
  for(let i=0;i<salaah.length;i++)
  {
    let y = (i+1) + ". " + salaah[i].value;
    $('#mylist5').append(
      $('<li>').text(y).attr('class','list-group-item')
    )
  }


  let umar = content.age;
  for(let i=0;i<umar.length;i++)
  {
    let y = umar[i].value;
     $('#mylist2').append(
       $('<li>').text(y).attr('class','list-group-item')
     )
  }
 
  let beemari = content.disease;
  for(let i=0;i<beemari.length;i++)
  {
    let y = beemari[i].key + ":" + beemari[i].value;
     $('#mylist').append(
       $('<li>').text(y)
     )
  }


  let ling = content.gender;
  for(let i=0;i<ling.length;i++)
  {
    let y = ling[i].value;
     $('#mylist3').append(
       $('<li>').text(y).attr('class','list-group-item')
     )
  }

  let dawai = content.medication;
  for(let i=0;i<dawai.length;i++){
    let t = (i+1) + ". " + dawai[i].value ;
    $('#mylist6').append(
      $('<li>').text(t).attr('class','list-group-item list-group-item-success')
    )
    let q
    for(let j=0;j<dawai[i].sub_value.length;j++){
        q = dawai[i].sub_value[j].key + ': ' + dawai[i].sub_value[j].value +",";
        $("#mylist6").append(
          $('<li>').text(q).attr('class','list-group-item').attr('class','offset-md-2')
        )
    }
    
  }

  let naam = content.name;
  for(let i=0;i<naam.length;i++)
  {
    let y = naam[i].value;
     $('#mylist1').append(
       $('<li>')
          .text(y)
          .attr('class','list-group-item')
     )
  }

  let symp = content.symptoms;
  for(let i=0;i<symp.length;i++)
  {
    let y = (i+1) + ". " + symp[i].value;
     $('#mylist4').append(
       $('<li>').text(y).attr('class','list-group-item')
     )
  }
  
}


//--------------------------------------------------------PDF Generation---------------------------------------------------------//
function genpdf(){
  
  doc=new jsPDF()
  
  let salaah = content.advice;
  $('#printing-holder').append($('<p>').text(salaah))
  $('#printing-holder').append($('<br>'))
  for(let i=0;i<salaah.length;i++)
  {
    let y = (i+1) + ". " + salaah[i].value;
    $('#printing-holder').append(
      $('<p>').text(y)
    )
  }


  let umar = content.age;
  $('#printing-holder').append($('<p>').text(umar))
  $('#printing-holder').append($('<br>'))
  for(let i=0;i<umar.length;i++)
  {
    let y = umar[i].value;
    $('#printing-holder').append(
      $('<p>').text(y)
    )
  }
 
  let beemari = content.disease;
  $('#printing-holder').append($('<p>').text(beemari))
  $('#printing-holder').append($('<br>'))
  for(let i=0;i<beemari.length;i++)
  {
    let y = beemari[i].key + ":" + beemari[i].value;
    $('#printing-holder').append(
      $('<p>').text(y)
    )
  }


  let ling = content.gender;
  $('#printing-holder').append($('<p>').text(ling))
  $('#printing-holder').append($('<br>'))
  for(let i=0;i<ling.length;i++)
  {
    let y = ling[i].value;
    $('#printing-holder').append(
      $('<p>').text(y)
    )
  }
  
    doc.fromHTML($('#printing-holder').get(0),10,10)
    doc.save('Prescription.pdf')
    
}

