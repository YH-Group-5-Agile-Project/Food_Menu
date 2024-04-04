/*let dictionary: { [key: string]: string } = {
    '6604087a29f983c33c7b4141': 'burgerRecommended',
    '6604089029f983c33c7b630e': 'salmonRecommended', 
    '6604089e29f983c33c7b79eb': 'cauliflowerRecommended',
    '660408b229f983c33c7b98fc': 'sirloinRecommended',
    '660bc29a29f983c33c49dedb': 'poussinRecommended',
    '660becfe29f983c33c4d5166': 'risottoRecommended'
  };*/
  
  let dictionary: { [key: string]: string } = {
    '6604087a29f983c33c7b4141': '660ad46229f983c33c37ab4a', //burger  
    '6604089029f983c33c7b630e': '660aef0e29f983c33c38a3c2', //salmon
    '6604089e29f983c33c7b79eb': '660af0ea29f983c33c38fcf2', //cauliflower
    '660408b229f983c33c7b98fc': '660bccee29f983c33c4aaff9', //sirloin
    '660bc29a29f983c33c49dedb': '6604090e29f983c33c7c35c4', //poussin
    '660becfe29f983c33c4d5166': '660ad48c29f983c33c37ac34'  //risotto
  };
  export const Recommendation = (id: string): string => {
    let sideRecommendation: string;
    sideRecommendation = dictionary[id]; 
    return sideRecommendation;
  };