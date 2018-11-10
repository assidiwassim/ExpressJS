const express = require('express');
const bodyParser= require('body-parser')
var parserString = require('xml2js').parseString;
var json2html = require('json-to-html')
var jsonMakeHTML = require('json-make-html');
const app = express();
var Request = require("request");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.get('/result', (req, res) => {
	d="NO RESULT FOUND";
	res.render(__dirname + '/result.ejs',{resu:d});
})
app.post('/result', (req, res) => {
	console.log(req.body);
    Request.post("http://10.13.67.20:8080/Login?user=minsat1&amp&password=minsat123",(error, response, bodd) => {
		if(error) {
            resu='err';
            res.render(__dirname + '/result.ejs',{resu:resu});
            return console.log("error");
         }		 
	var str11=response.headers["set-cookie"];
		var str=response.headers["set-cookie"][0];
		var SplitStr=str.split(";");
	
		var SplitStr2=SplitStr[0].split("=");
		var key=SplitStr2[0];
		var val=SplitStr2[1];
		var url="http://10.13.67.20:8080/testShrMA.pub?"

		
		url+="User-Agent="+"Minsat%2F3.9%2F1.0"
		url+="&"
		url+="msisdn=216"+req.body.numero
		url+="&"
		url+="startDate="+req.body.datedebut
		url+="&"
		url+="endDate="+req.body.datefin
		url+="&"
		console.log(url)
		
		var req1={
			url:url,
			headers:{
				"User-Agent":"Minsat%2F3.9%2F1.0",
				"Cookie":str11
			}
		}
		
		Request.get(req1, (errp, responseep, bodyp) => {
			if(errp) {
            resu='err';
            res.render(__dirname + '/result.ejs',{resu:resu});
			
            return console.log("err");
			}
	
	
		parserString(bodyp,function(err,resultXML){
			if(err){
				res.render(__dirname + '/result.ejs',{resu:"errParserString"});
				return console.log(err);
			}
			
			if(!resultXML["subscriptionHistoryMA"]){
				res.render(__dirname + '/result.ejs',{resu:"Error of dates"});
				return console.log("Error of dates");
			}

		
				var d="";
				
				if(resultXML["subscriptionHistoryMA"]["aIRSRefillMA"]){
					
					resultXML["subscriptionHistoryMA"]["aIRSRefillMA"].forEach(function(x){
						
					
						/*  aIRSRefillMA */
						d+= "<tr><td>" 

						d+=String(x["transactionDateTime"]).split("+")[0]+"</td><td>"
						if(x["nominalAmount"]){
							d+=x["nominalAmount"][0]._ +"</td><td>"
						}else{
							d+="-</td><td>"
						}
						if(x["mainAccountBalance"]){
							d+=x["mainAccountBalance"][0]._ +"</td><td>"
						}else{
							d+="-</td><td>"
						}
						d+="-</td><td>"
						if(x["segmentationId"]){
							d+=x["segmentationId"] +"</td><td>"
						}else{
							d+="-</td><td>"
						}
						if(x["originNodeId"]){
							d+=x["originNodeId"] +"</td>"
						}else{
							d+="-</td><td>"
						}
						d+="<td><form method='post' action='/details'><input type='hidden' name='transactionId' value='"+x["transactionId"] +"'><button type='submit'>Details</button></form></td></tr>"
						

				   });
				}

				if(resultXML["subscriptionHistoryMA"]["pAMEvaluationMA"]){
					

					resultXML["subscriptionHistoryMA"]["pAMEvaluationMA"].forEach(function(x){
						
					d+= "<tr><td>" 
						/*  aIRSRefillMA */
						+String(x["transactionDateTime"]).split("+")[0]+"</td><td>"
						/* +x["subscriberNumber"] +"</td><td>"*/
						/* +x["accountNumber"] +"</td><td>" */
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+x["serviceClassId"] +"</td><td>"
						+x["pAMEventType"] +"</td><td>"
						+x["originNodeId"] +"</td>"
						+"<td><form method='post' action='/details'><input type='hidden' name='transactionId' value='"+x["transactionId"] +"'><button type='submit'>Details</button></form></td></tr>"

				   });
				}
				  
				  
				if(resultXML["subscriptionHistoryMA"]["cDRMA"]){
					
					resultXML["subscriptionHistoryMA"]["cDRMA"].forEach(function(x){
					   if(x["transactionId"].toString().indexOf("OCC")!=-1){
							/*  cDRMA OCC */
							/* d+= "<tr><td><b> OCC</b><td></tr>" */
							d+= "<tr><td>" 
						+String(x["transactionDateTime"]).split("+")[0] +"</td><td>"
						+x["transactionAmount"][0]._ +"</td><td>"
						+x["mainAccountBalance"][0]._ +"</td><td>"
						/* +x["chargingContext"] +"</td><td>" */
						+x["serviceIdentifier"] +"</td><td>"
						+x["dataVolume"] +"</td><td>"
						
						+"_</td><td>"
						+x["locationNumber"] +"</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td><td>"
						+"_</td>"
						+"<td><form method='post' action='/details'><input type='hidden' name='transactionId' value='"+x["transactionId"] +"'><button type='submit'>Details</button></form></td></tr>"
						
					   }else {
							   /*  cDRMA CCN */
							    /*  d+= "<tr><td><b> CCN</b><td></tr>"  */
							    d+= "<tr><td>" 
						+String(x["transactionDateTime"]).split("+")[0] +"</td><td>"
						+x["transactionAmount"][0]._ +"</td><td>"
						+x["mainAccountBalance"][0]._ +"</td><td>"
						/* +x["chargingContext"] +"</td><td>" */
						+x["serviceIdentifier"] +"</td><td>"
						+x["duration"] +"</td><td>"						
						+x["otherPartyNumber"] +"</td><td>"
						+x["locationNumber"] +"</td><td>"
						+x["routingNumber"] +"</td><td>"
                        +"_</td><td>"
						+"_</td><td>"
						+"_</td>"
						+"<td><form method='post' action='/details'><input type='hidden' name='transactionId' value='"+x["transactionId"] +"'><button type='submit'>Details</button></form></td></tr>"

					   }
					
						

				   });
				}

				
			

				
			    res.render(__dirname + '/result.ejs',{resu:d});
				return console.log("okk");
				
		})
				
				}).auth('root','root123',false);
		})
		
	
   
})


app.listen(3000, function() {
    
    console.log('listening on 3000')
})


app.get('/result', (req, res) => {
	d="NO RESULT FOUND";
	res.render(__dirname + '/result.ejs',{resu:d});
})
app.post('/details', (req, res) => {
	// console.log(req.body);
	transactionId=""
    Request.post("http://10.13.67.20:8080/Login?user=minsat1&amp&password=minsat123",(error, response, bodd) => {
		if(error) {
            resu='err';
            res.render(__dirname + '/result.ejs',{resu:resu});
            return console.log("error");
         }		 
	var str11=response.headers["set-cookie"];
		var str=response.headers["set-cookie"][0];
		var SplitStr=str.split(";");
	
		var SplitStr2=SplitStr[0].split("=");
		var key=SplitStr2[0];
		var val=SplitStr2[1];
		var url="http://10.13.67.20:8080/testShrTD.pub?"

		
		url+="User-Agent="+"Minsat%2F3.9%2F1.0"
		url+="&"
		url+="transactionId="+req.body.transactionId
		console.log(url)
		var req1={
			url:url,
			headers:{
				"User-Agent":"Minsat%2F3.9%2F1.0",
				"Cookie":str11
			}
		}
		Request.get(req1, (errp, responseep, bodyp) => {
			if(errp) {
            resu='err';
            res.render(__dirname + '/result.ejs',{resu:resu});
			
            return console.log("err");
			}
	
			console.log(bodyp)
	
			parserString(bodyp,function(err,resultXML){
				if(err){
					res.render(__dirname + '/details.ejs',{resu:"errParserString"});
					return console.log(err);
				}
				var args = {
					separator : ': ',
					iterator : 1,
					wrapper : {
						before : '',
						class : 'jsonhtml',
						elem : 'span',
						after : ' '
					},
					child : {
						before : '',
						class : 'jsonhtml__singlechild',
						elem : 'span',
						titleClass : 'jsonhtml__parent',
						titleElem : 'span',
						after : ' <br>'
					},
					css :{
						title : 'margin: 9px 0 0;color:#f39c12;font-size:16px',
						wrapperElem : '',
						childElem : 'list-style-type:none;',
						childElemNested : 'margin-left: 18px;'
					}
			
				};

			
					var d="";
					
					// var aux=String(resultXML)
					// aux.replace("{","").replace("}","").replace("<","").replace(">",'')
					// /*  aIRSRefillMA */
					// aux="'"+aux+"'"
					// console.log((aux))
					// d+= json2html(resultXML) ;
					d=jsonMakeHTML.make(resultXML,args, function(html){});
				

					res.render(__dirname + '/details.ejs',{resu:d});
					// return console.log("okk");
					
			})
					
					}).auth('root','root123',false);
			})

})
// http://10.13.67.20:8080/testShrTD.pub?User-Agent=Minsat%2F3.9%2F1.0&transactionId=458500038645965625064330122018110523071400000000SDP_TN1SDP7A-010000
// http://10.13.67.20:8080/testShrMA.pub?User-Agent=Minsat%2F3.9%2F1.0&transactionId=458500038645965625064330122018110523071400000000SDP_TN1SDP7A-010000
