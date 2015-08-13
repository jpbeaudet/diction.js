#!/bin/bash
EMAIL=$1
SUBJECT=$2
CONTENT=$3



echo "$EMAIL $SUBJECT $CONTENT"
mail -s "$SUBJECT" "$EMAIL" < $CONTENT
echo "Text content sent to $EMAIL"
