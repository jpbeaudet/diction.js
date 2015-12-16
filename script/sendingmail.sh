#!/bin/bash
EMAIL=$1
SUBJECT=$2
CONTENT=$3

if [ "$#" -ne 3 ]; then 
    echo "illegal number of parameters"
fi

echo "$EMAIL $SUBJECT $CONTENT"
mail -s "$SUBJECT" "$EMAIL" < $CONTENT
echo "Text content sent to $EMAIL"
if [ -f $CONTENT ]; then
rm $CONTENT
echo " File $CONTENT DELETED"
fi
