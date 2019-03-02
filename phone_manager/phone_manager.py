from twilio.rest import Client

account_sid = 'AC7373c0567a71f78536e37bb00440c1be'
auth_token = 'af435efdcabfe312e087585cc63a069b'
client = Client(account_sid, auth_token)

call = client.calls.create(
                        url='http://demo.twilio.com/docs/voice.xml',
                        to='+14794306900',
                        from_='+14792084105'
                    )

print(call.sid)
