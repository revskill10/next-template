const soap = require('strong-soap').soap;
// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
const url = 'http://dk.hpu.edu.vn:8088/HPUWebService.asmx?WSDL';

const requestArgs = {
    masinhvien: '1812601004',
};

async function createClient(soap) {  
  return new Promise(function (resolve, reject) {
    soap.createClient(url, options, function(err, client) {
      if (err) {
        return reject(err)
      } else {
        return resolve(client)
      }
    })
  })
}
var options = {};
async function test() {
  const client = await createClient(soap)
  const {result,envelope, soapHeader} = await client['SoTinChiSinhVienDaDangKy'](requestArgs)
  console.log(JSON.stringify(result["SoTinChiSinhVienDaDangKyResult"]["diffgram"]["DocumentElement"]["SoTinChiSinhVienDaDangKy"]))
}

test();