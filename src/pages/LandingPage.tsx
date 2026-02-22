import { Link } from "react-router-dom";
import { MapPin, Users, Heart, ArrowRight, HelpCircle, MessageCircle, Star, CheckCircle, Linkedin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <MapPin className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NamePlace</h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">Never forget a face or name again</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">Remember the cute barista who makes your perfect latte. Keep track of colleagues, neighbors, and everyone you meet. NamePlace helps you build meaningful connections by organizing the people in your world.</p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Get Started<ArrowRight className="ml-2 h-5 w-5" /></Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"><Heart className="h-8 w-8 text-blue-600" /></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Remember Personal Connections</h3>
              <p className="text-gray-600 leading-relaxed">Pin the coffee shop where Sarah works, or mark the gym where you met your workout buddy. Never lose track of the people who matter.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"><MapPin className="h-8 w-8 text-indigo-600" /></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location-Based Memory</h3>
              <p className="text-gray-600 leading-relaxed">Associate names with places. When you return to that restaurant, you'll remember your server's name and build stronger relationships.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"><Users className="h-8 w-8 text-purple-600" /></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Build Your Network</h3>
              <p className="text-gray-600 leading-relaxed">From casual acquaintances to close friends, organize your social circle and never feel awkward about forgetting someone's name again.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-12">Perfect for everyday situations</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"><h4 className="text-xl font-semibold text-blue-800 mb-4">"The cute barista at my favorite café"</h4><p className="text-blue-700">Remember Alex who always draws hearts in your latte foam, so you can greet them by name next time.</p></div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl"><h4 className="text-xl font-semibold text-indigo-800 mb-4">"People from networking events"</h4><p className="text-indigo-700">Tag conference contacts with the venue where you met, making follow-ups more personal and memorable.</p></div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl"><h4 className="text-xl font-semibold text-purple-800 mb-4">"Neighbors and local friends"</h4><p className="text-purple-700">Keep track of everyone in your community, from the friendly dog walker to your kids' friends' parents.</p></div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl"><h4 className="text-xl font-semibold text-green-800 mb-4">"Service providers you love"</h4><p className="text-green-700">Remember your favorite hair stylist, mechanic, or doctor, along with notes about your interactions.</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg border-0 shadow-sm"><AccordionTrigger className="px-6 py-4 text-left hover:no-underline"><span className="font-semibold text-gray-800">How does NamePlace help me remember people?</span></AccordionTrigger><AccordionContent className="px-6 pb-4 text-gray-600">NamePlace uses location-based memory to help you remember people by associating them with places. When you add someone to your map, you can include their name, notes about them, and tag them with specific locations.</AccordionContent></AccordionItem>
              <AccordionItem value="item-2" className="bg-white rounded-lg border-0 shadow-sm"><AccordionTrigger className="px-6 py-4 text-left hover:no-underline"><span className="font-semibold text-gray-800">Is my personal information secure?</span></AccordionTrigger><AccordionContent className="px-6 pb-4 text-gray-600">Yes, absolutely. All your data is encrypted and stored securely. Only you can access your personal pins and notes.</AccordionContent></AccordionItem>
              <AccordionItem value="item-3" className="bg-white rounded-lg border-0 shadow-sm"><AccordionTrigger className="px-6 py-4 text-left hover:no-underline"><span className="font-semibold text-gray-800">Is NamePlace free to use?</span></AccordionTrigger><AccordionContent className="px-6 pb-4 text-gray-600">Yes! NamePlace is currently free to use with all core features available. Simply sign in with your Google account to get started.</AccordionContent></AccordionItem>
              <AccordionItem value="item-4" className="bg-white rounded-lg border-0 shadow-sm"><AccordionTrigger className="px-6 py-4 text-left hover:no-underline"><span className="font-semibold text-gray-800">Can I organize people into categories?</span></AccordionTrigger><AccordionContent className="px-6 pb-4 text-gray-600">Yes! NamePlace includes a flexible tagging system that lets you organize people by categories like "work," "friends," "service providers," or any custom tags you create.</AccordionContent></AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Start building better relationships today</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of people who never forget a name or face.</p>
          <Link to="/auth"><Button size="lg" variant="secondary" className="text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white text-blue-600 hover:bg-gray-50">Sign In with Google<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </div>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4"><MapPin className="h-6 w-6 text-gray-600" /><span className="text-lg font-semibold text-gray-700">NamePlace</span></div>
          <p className="text-gray-600 mb-6">Remember everyone, everywhere.</p>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-center space-x-2 mb-3"><MessageSquare className="h-5 w-5 text-blue-600" /><span className="text-gray-700 font-medium">Found a bug or have ideas?</span></div>
            <a href="https://www.linkedin.com/in/aohana/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /><span className="font-medium">Reach out on LinkedIn</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
