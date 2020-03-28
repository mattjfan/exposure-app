
const  CSVParse = (strData,strDelimiter)=>{
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    const data=[]
    let count=0
    let sum = 0

    console.log('BEGGINGING ',arrData[1])
   
    arrData.forEach((country)=>{
        if(country[3]=='US' ){
            
            let len=country.length
            count++
            sum+=parseFloat(country[7])
            data.push({
                name: country[2],
                latitude: parseFloat(country[5]),
                longitude: parseFloat(country[6]),
                weight: isNaN(parseFloat(country[7]))? 0 : parseFloat(country[7]) })
        }
    }) 
    return {data,count,sum}
}
const appendLeadingZeroes=(n)=>{
    if(n <= 9){
      return "0" + n;
    }
    return n
  }
const getCurrentDate=()=>{
    var date = new Date()
    date.setDate(date.getDate()-1)
    let day = appendLeadingZeroes( date.getDate() )
    day=parseInt(day)
    let month =  appendLeadingZeroes( date.getMonth()+1 )
    let year= date.getFullYear()
    console.log('YEAR',year)
    console.log(`${month}-${day}-${year}`)
    return `${month}-${day}-${year}`
}

export const getJHUCSV=()=>
    fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${getCurrentDate()}.csv`)
    .then((blob)=>blob.text()
    .then((txt)=>{ 
        const data= CSVParse(txt,',')
                return data } ) )
    .catch(e=>console.log(e))

    