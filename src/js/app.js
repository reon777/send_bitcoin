import bitcore from 'bitcore-lib'
import explorers from 'bitcore-explorers'

window.send = function send(from_address, privateKey, to_address, amount, fee) {
  console.log('start send')
  var insight = new explorers.Insight()

  insight.getUnspentUtxos(from_address, function(err, utxos) {
    if (err) {
      console.log('error発生')
      console.log(err)
    } else {
      console.log(utxos)
      var Transaction = bitcore.Transaction
      console.log('Transaction: ' + Transaction)
      var transaction = new Transaction()
        .fee(fee)
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
}

window.create_address = function create_address() {
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
