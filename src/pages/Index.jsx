import { useState, useEffect, useCallback } from "react";
import { Cat, Heart, Info, Paw, Camera, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face." },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domestic cat breeds, known for their tufted ears and bushy tails." },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Developed to resemble exotic jungle cats like leopards and ocelots." },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Intelligent, Soft-voiced", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", description: "Famous for their unique folded ears, giving them an owl-like appearance." },
];

const catFacts = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the meow.",
  "A cat's hearing is much more sensitive than humans and dogs.",
  "Cats have a third eyelid called the 'haw' to protect their eyes.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 230 bones, while humans only have 206.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
];

const CatCard = ({ breed, origin, temperament, image, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="mb-4 overflow-hidden h-full">
      <img src={image} alt={breed} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle>{breed}</CardTitle>
        <CardDescription>Origin: {origin}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2"><strong>Temperament:</strong> {temperament}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const catNamePrefixes = ["Mr.", "Mrs.", "Sir", "Lady", "Prince", "Princess", "Lord", "Captain", "Professor", "Doctor"];
const catNameSuffixes = ["Whiskers", "Paws", "Fluff", "Mittens", "Socks", "Purrington", "Meowser", "Clawsome", "Furball", "Pawsome"];

const generateCatName = () => {
  const prefix = catNamePrefixes[Math.floor(Math.random() * catNamePrefixes.length)];
  const suffix = catNameSuffixes[Math.floor(Math.random() * catNameSuffixes.length)];
  return `${prefix} ${suffix}`;
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [catName, setCatName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = useCallback(() => {
    setLikes((prevLikes) => prevLikes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You're pawsome! 🐾",
    });
  }, [toast]);

  const handleGenerateName = useCallback(() => {
    const newName = generateCatName();
    setCatName(newName);
    toast({
      title: "New Cat Name Generated!",
      description: `Meet ${newName}!`,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8"
        >
          <h1 className="text-6xl font-bold mb-2 text-center text-purple-800 flex items-center justify-center">
            <Cat className="mr-2 text-pink-500" /> Purrfect Cats
          </h1>
          <p className="text-xl text-center text-gray-600 mb-4">Discover the wonderful world of felines!</p>
        </motion.div>

        <div className="bg-yellow-100 rounded-lg p-4 mb-8 overflow-hidden relative">
          <motion.p
            key={currentFactIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-800 italic"
          >
            <Info className="inline mr-2 h-5 w-5 text-yellow-600" />
            {catFacts[currentFactIndex]}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="mb-8">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index}>
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Paw className="mr-2 text-pink-500" />
                  Fascinating Felines
                </CardTitle>
                <CardDescription>Learn about the charm and characteristics of cats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-4">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
                </p>
                <h3 className="text-xl font-semibold mb-2">Characteristics of Cats</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially their night vision</li>
                  <li>Soft fur and a variety of coat patterns</li>
                  <li>Communicate through meowing, purring, and body language</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 text-pink-500" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription>Explore some of the most beloved cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catBreeds.map((breed, index) => (
                    <CatCard key={index} {...breed} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <Button 
            variant="outline" 
            onClick={handleLike}
            className="flex items-center"
          >
            <Heart className="mr-2 h-4 w-4 text-red-500" /> Like
          </Button>
          <Badge variant="secondary" className="text-lg">
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </Badge>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Generated cat name"
              value={catName}
              readOnly
              className="w-48"
            />
            <Button onClick={handleGenerateName} className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" /> Generate Name
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
