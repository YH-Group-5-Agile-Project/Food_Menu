let dictionary: { [key: string]: string } = {
    '6604087a29f983c33c7b4141': 'Beef burger', 
    '6604089029f983c33c7b630e': 'Poached salmon',
    '6604089e29f983c33c7b79eb': 'Cauliflower', //Av någon oerhört oklar anledning funkar inte denna, 
    '660408b229f983c33c7b98fc': 'Roasted sirloin', 
    '660bc29a29f983c33c49dedb': 'Fried poussin',
    '660becfe29f983c33c4d5166': 'Risotto',
    '6604090e29f983c33c7c35c4': 'Potato wedges', 
    '660ad46229f983c33c37ab4a': 'Sweet fries', 
    '660ad48c29f983c33c37ac34': 'Garlic bread', 
    '660aef0e29f983c33c38a3c2': 'Bulgur', 
    '660af0ea29f983c33c38fcf2': 'Asparagus',
    '660bccee29f983c33c4aaff9': 'Hasselback potato', 
  };
  
  export const ShortName = (id: string): string => {
    return dictionary[id]; 
  };