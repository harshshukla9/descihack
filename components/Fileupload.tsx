'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, FileUp, Download, CheckCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { toast } from "sonner"
import { cn } from '@/lib/utils'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processed, setProcessed] = useState(false)
  const [resultFileUrl, setResultFileUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simulated file upload animation
  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 100)
    return interval
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file')
        setFile(null)
        return
      }
      setError(null)
      setFile(selectedFile)
      setProcessed(false)
      setResultFileUrl(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      if (!droppedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file')
        setFile(null)
        return
      }
      setError(null)
      setFile(droppedFile)
      setProcessed(false)
      setResultFileUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setError(null)
    setIsSubmitting(true)
    const progressInterval = simulateProgress()

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // In a real implementation, you would send this to your backend
      const response = await fetch('/api/processcsvfile', {
        method: 'POST',
        body: formData,
      })
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (!response.ok) throw new Error('Failed to process file')
      const data = await response.json()
      
      clearInterval(progressInterval)
      setProgress(100)
      
      // Simulate receiving a download URL from the backend
      setTimeout(() => {
        setResultFileUrl('/example-result.xlsx')
        setProcessed(true)
        setIsSubmitting(false)
        toast.success("Processing complete", {
            description: "Your file has been processed successfully!"
          })
      }, 500)
    } catch (err) {
      clearInterval(progressInterval)
      setError('An error occurred during file processing')
      setIsSubmitting(false)
      toast.error("Error", {
        description: "Failed to process your file. Please try again."
      })
    }
  }

  const handleReset = () => {
    setFile(null)
    setProcessed(false)
    setResultFileUrl(null)
    setProgress(0)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadResult = () => {
    // In a real app, this would be the actual URL to download the Excel file
    toast("Downloading", {
        description: "Your Excel file is being downloaded"
      })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent ">
            NIH Dataset Processor
          </h1>
          
        </div>

        <Card className="w-full shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-200/50">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 pb-4">
            <CardTitle className="text-xl font-bold">Dataset Processor</CardTitle>
            <CardDescription>Upload your CSV file to start processing</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300",
                    file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <Label 
                    htmlFor="file" 
                    className="flex flex-col items-center justify-center h-32 cursor-pointer"
                  >
                    {file ? (
                      <>
                        <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleReset}
                          className="mt-2 text-xs"
                        >
                          Change file
                        </Button>
                      </>
                    ) : (
                      <>
                        <FileUp className="h-10 w-10 text-gray-400 mb-2 group-hover:text-purple-500" />
                        <p className="font-medium">
                          Drop your CSV file here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Only CSV files are accepted
                        </p>
                      </>
                    )}
                  </Label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className={cn(
                      "w-full bg-gradient-to-r transition-all duration-300",
                      isSubmitting || !file 
                        ? "from-gray-400 to-gray-500 cursor-not-allowed"
                        : "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    )}
                    disabled={isSubmitting || !file}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      "Process Dataset"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>

          {processed && resultFileUrl && (
            <CardFooter className="bg-green-50 border-t border-green-100 flex flex-col items-stretch p-4">
              <div className="text-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Processing Complete!</p>
              </div>
              <Button 
                onClick={downloadResult}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                <Download className="mr-2 h-4 w-4" /> Download Processed Excel
              </Button>
            </CardFooter>
          )}
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>NIH Dataset Processor • Hackathon Project 2025</p>
        </div>
      </div>
    </div>
  )
}