from django.shortcuts import render
from django.http import JsonResponse
import openai
# Create your views here.

openai_api_key='MI-API-KEY'
openai.api_key=openai_api_key

def ask_openai(message):
    response = openai.Completion.create(
        model = "text-davinci-003",
        prompt= message,
        max_tokens=150,
        n=1,
        stop= None,
        temperature=0.7,
    )
    
    answer = response.choices[0].text.strip()
    answer = "Miau... " + answer + " ...Miau"
    return answer


def chatbot(request):
    if request.method=='POST':
        message =  request.POST.get('message')

        sarcastic_order = "Quiero que actúes como una persona sarcástica. "
        message = sarcastic_order + message

        response = ask_openai(message)
        return JsonResponse({'message':message, 'response':response})
    return render(request, 'chatbot.html')