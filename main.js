var bitcore = require('bitcore-lib')
var explorers = require('bitcore-explorers')

var insight = new explorers.Insight()
console.log('insight: ' + insight)
var from_address = '送金元のアドレス'
var privateKey = '送金元の秘密鍵'
let to_address = '送金先のアドレス'
// 送金金額
let amount = 10000 //(0.0001BTC = 10000satoshi)

insight.getUnspentUtxos(from_address, function(err, utxos) {
  if (err) {
    console.log('error発生')
    console.log(err)
  } else {
    console.log(utxos)
    var Transaction = bitcore.Transaction
    console.log('Transaction: ' + Transaction)
    var transaction = new Transaction()
      .fee(10000) //手数料(0.0001BTC = 10000satoshi)
      .from(utxos)
      .to(to_address, amount) //送金先アドレス、送金金額
      .change(from_address) //お釣りの送金先アドレス
      .sign(privateKey)
    console.log('transaction: ' + transaction)

    insight.broadcast(transaction, function(err, returnedTxId) {
      if (err) {
        console.log(err)
      } else {
        console.log(returnedTxId)
      }
    })
  }
})

function created() {
  //秘密鍵の生成
  var private_key = new bitcore.PrivateKey('livenet')
  console.log('秘密鍵 : ' + private_key.toString())

  //公開鍵
  var public_key = private_key.toPublicKey()

  //アドレス
  var address = public_key.toAddress()
  console.log('アドレス：' + address.toString())
  return address.toString()
}
